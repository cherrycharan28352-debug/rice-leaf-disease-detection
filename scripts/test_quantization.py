import os
import sys
import numpy as np
import torch
import onnxruntime as ort
from onnxruntime.quantization import quantize_dynamic, QuantType

model_fp32 = os.path.join("models", "ricenet.onnx")
model_quant = os.path.join("models", "ricenet_int8.onnx")

print("Quantizing ricenet.onnx to dynamic int8...")
quantize_dynamic(
    model_input=model_fp32,
    model_output=model_quant,
    weight_type=QuantType.QUInt8
)

size_fp32 = os.path.getsize(model_fp32) / (1024 * 1024)
size_quant = os.path.getsize(model_quant) / (1024 * 1024)
print(f"FP32 size: {size_fp32:.2f} MB")
print(f"Quantized size: {size_quant:.2f} MB")

# Test inference on both with dummy input
dummy = np.random.randn(1, 3, 224, 224).astype(np.float32)

sess_fp32 = ort.InferenceSession(model_fp32, providers=["CPUExecutionProvider"])
out_fp32 = sess_fp32.run(None, {"input": dummy})[0]

sess_quant = ort.InferenceSession(model_quant, providers=["CPUExecutionProvider"])
out_quant = sess_quant.run(None, {"input": dummy})[0]

pred_fp32 = np.argmax(out_fp32, axis=1)[0]
pred_quant = np.argmax(out_quant, axis=1)[0]
correlation = np.corrcoef(out_fp32[0], out_quant[0])[0, 1]

print(f"FP32 Top Class: {pred_fp32}, Quant Top Class: {pred_quant}")
print(f"Logits Pearson Correlation: {correlation:.4f}")
print("Quantization verification completed successfully!")
