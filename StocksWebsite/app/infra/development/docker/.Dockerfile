
FROM python:3.12-slim

WORKDIR /app

# This command will copy all files
# from the same directory as the Dockerfile in the github repo (FlaskWebProject3/FlaskWebProject3)
# to /app inside the container
COPY . .

RUN pip install --no-cache-dir -r requirements.txt

ENV SERVER_HOST=0.0.0.0
ENV SERVER_PORT=5000

EXPOSE 5000

CMD ["python", "app.py"]