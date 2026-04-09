# Base image Python
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Cài system dependencies + Stockfish
RUN apt-get update && \
    apt-get install -y stockfish && \
    apt-get clean

# Copy toàn bộ project vào container
COPY . .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port (Railway sẽ override bằng $PORT)
EXPOSE 8000

# Run app (QUAN TRỌNG: dùng $PORT)
CMD ["sh", "-c", "uvicorn backend.main:app --host 0.0.0.0 --port $PORT"]