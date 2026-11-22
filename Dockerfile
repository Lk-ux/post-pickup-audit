FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 \
    libglib2.0-0 \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install requirements from ai-service
COPY ai-service/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy ai-service source code
COPY ai-service/ .

# Generate realistic demo sample images inside the container
RUN python generate_sample_images.py

EXPOSE 5000

CMD ["python", "app.py"]
