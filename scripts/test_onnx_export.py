import os
import sys

# Ensure UTF-8 output on Windows
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8")

import torch
import torch.nn as nn

sys.path.insert(0, os.path.abspath(os.path.dirname(__file__) + "/.."))
from ml.dataset_info import DISEASE_CLASSES
from ml.quantum_vqc import HybridCNNPCAVQC

weights_path = os.path.join(os.path.dirname(__file__), "..", "models", "ricenet_weights.pth")
state = torch.load(weights_path, map_location="cpu")

model = HybridCNNPCAVQC(num_classes=len(DISEASE_CLASSES))
model.load_state_dict(state)
model.eval()

dummy_input = torch.randn(1, 3, 224, 224)

# 1. Export RiceNet CNN backbone + classifier
print("Testing RiceNet CNN backbone export...")
class CNNBackboneWithClassifier(nn.Module):
    def __init__(self, hybrid_model):
        super().__init__()
        self.cnn = hybrid_model.cnn
    def forward(self, x):
        return self.cnn(x)

cnn_only = CNNBackboneWithClassifier(model)
cnn_only.eval()
cnn_out = cnn_only(dummy_input)
print("CNN out shape:", cnn_out.shape)

out_path = os.path.join(os.path.dirname(__file__), "..", "models", "ricenet.onnx")

try:
    # Use dynamo=False to use the battle-tested standard TorchScript-based ONNX exporter
    torch.onnx.export(
        cnn_only,
        dummy_input,
        out_path,
        export_params=True,
        opset_version=17,
        do_constant_folding=True,
        input_names=["input"],
        output_names=["logits"],
        dynamic_axes={"input": {0: "batch_size"}, "logits": {0: "batch_size"}},
        dynamo=False
    )
    print("SUCCESS: Exported ricenet.onnx! File size:", os.path.getsize(out_path))
except Exception as e:
    import traceback
    print("FAILED CNN export:", e)
    traceback.print_exc()

# Verify with ONNX Runtime
try:
    import onnxruntime as ort
    sess = ort.InferenceSession(out_path, providers=["CPUExecutionProvider"])
    ort_inputs = {"input": dummy_input.numpy()}
    ort_outs = sess.run(None, ort_inputs)
    print("ONNX Runtime verification SUCCESS! Output shape:", ort_outs[0].shape)
    diff = (torch.tensor(ort_outs[0]) - cnn_out).abs().max().item()
    print("PyTorch vs ONNX max diff:", diff)
    assert diff < 1e-4, "Difference too large!"
    print("MATCH VERIFIED: ONNX outputs match PyTorch outputs identically!")
except Exception as e:
    print("ONNX Runtime verification failed:", e)
