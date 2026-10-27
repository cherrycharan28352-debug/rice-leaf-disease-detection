# ==============================================================================
# RiceCare AI - Multi-Stage Production Dockerfile
# Builds modern React frontend and runs with PyTorch HybridCNNPCAVQC FastAPI server
# ==============================================================================

# ------------------------------------------------------------------------------
# Stage 1: Build Modern React Frontend
# ------------------------------------------------------------------------------
FROM node:22-alpine AS frontend-builder
WORKDIR /app

# Copy package manifests and install frontend dependencies
COPY frontend-react/package*.json ./
RUN npm install

# Copy source code and compile production bundle
COPY frontend-react/ ./
RUN npm run build

# ------------------------------------------------------------------------------
# Stage 2: Production Python Backend Runtime
# ------------------------------------------------------------------------------
FROM python:3.12-slim

# Prevent Python from writing .pyc files and buffer stdout
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PORT=8000

# Install runtime system libraries for OpenCV and healthcheck
RUN apt-get update && apt-get install -y --no-install-recommends \
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
COPY static_reports/ ./static_reports/
COPY translations/ ./translations/
COPY agriversion.db .
COPY server.py .
COPY run.py .

# Copy compiled frontend from Stage 1 builder
COPY --from=frontend-builder /app/dist ./frontend-react/dist
COPY frontend/assets/sample_leaves/ ./frontend/assets/sample_leaves/

# Expose HTTP port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD curl -f http://localhost:${PORT:-8000}/api/health || exit 1

# Start production server with dynamic port and memory-safe single worker
CMD ["sh", "-c", "uvicorn server:app --host 0.0.0.0 --port ${PORT:-8000} --workers 1"]
