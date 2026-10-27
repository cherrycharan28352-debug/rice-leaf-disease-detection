# ==============================================================================
# RiceCare AI - Production Dockerfile
# High-performance container for PyTorch HybridCNNPCAVQC model and FastAPI API
# ==============================================================================

FROM python:3.12-slim

# Prevent Python from writing .pyc files and buffer stdout
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PORT=8000

# Install system dependencies for OpenCV and image processing
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libgl1 \
    libglib2.0-0 \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy dependency manifest
COPY requirements.txt .

# Install dependencies using CPU-optimized PyTorch
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir torch torchvision --index-url https://download.pytorch.org/whl/cpu && \
    pip install --no-cache-dir -r requirements.txt

# Copy application directories and files
COPY backend/ ./backend/
COPY ml/ ./ml/
COPY models/ ./models/
COPY uploads/ ./uploads/
COPY downloads/ ./downloads/
COPY agriversion.db .
COPY server.py .
COPY run.py .

# Copy built production React frontend
COPY frontend-react/dist/ ./frontend-react/dist/
COPY frontend/assets/sample_leaves/ ./frontend/assets/sample_leaves/

# Expose HTTP port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD curl -f http://localhost:8000/api/health || exit 1

# Start production server
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]
