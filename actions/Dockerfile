FROM rasa/rasa-sdk:3.6.2

WORKDIR /app

COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY actions.py /app/actions.py

EXPOSE 5055

CMD ["start", "--actions", "actions"]
