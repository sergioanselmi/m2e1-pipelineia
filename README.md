# m2e1-pipelineia

openapi: 3.0.3
info:
  title: API de Chat con OpenAI
  description: |
    Este endpoint permite enviar una pregunta y obtener una respuesta generada por el modelo de OpenAI (gpt-3.5-turbo).
  version: 1.0.0

paths:
  /chat:
    post:
      summary: Enviar una pregunta al modelo de OpenAI
      description: |
        Recibe una pregunta en el cuerpo de la petición y retorna una respuesta generada por el modelo de OpenAI.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - pregunta
              properties:
                pregunta:
                  type: string
                  description: Pregunta que se enviará al modelo de OpenAI.
                  example: "¿Cuál es la capital de Francia?"
      responses:
        "200":
          description: Respuesta generada exitosamente por el modelo.
          content:
            application/json:
              schema:
                type: object
                properties:
                  respuesta:
                    type: string
                    description: Respuesta generada por el modelo.
                    example: "La capital de Francia es París."
        "400":
          description: La pregunta no fue proporcionada en el cuerpo de la petición.
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    example: "La pregunta no puede estar vacía."
        "500":
          description: Error interno del servidor al comunicarse con OpenAI.
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    example: "Error interno del servidor."
