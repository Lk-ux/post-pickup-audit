FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 \
    libglib2.0-0 \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install lightweight CPU-only PyTorch (avoids massive 2.5GB CUDA GPU download on Render)
RUN pip install --no-cache-dir torch torchvision --index-url https://download.pytorch.org/whl/cpu

# Install remaining dependencies
COPY ai-service/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code and model weights
COPY ai-service/ .

# Generate sample images if needed
RUN python generate_sample_images.py

EXPOSE 5000

CMD ["python", "app.py"]
