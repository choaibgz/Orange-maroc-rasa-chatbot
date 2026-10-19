FROM rasa/rasa:3.6.20-full

USER root

WORKDIR /app

COPY . /app

RUN chown -R 1001:0 /app && chmod -R g=u /app

USER 1001

RUN rasa train --config config.yml --domain domain.yml --data data --out models

EXPOSE 5005

CMD ["run", "--enable-api", "--cors", "*", "--debug", "--endpoints", "endpoints.yml", "--credentials", "credentials.yml", "--model", "models"]
