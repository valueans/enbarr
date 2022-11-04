FROM crowdbotics/cb-django:3.8-slim-buster AS build

# Copy dependency management files and install app packages to /.venv
COPY ./Pipfile ./Pipfile.lock /
RUN PIPENV_VENV_IN_PROJECT=1 pipenv install --deploy


FROM crowdbotics/cb-django:3.8-slim-buster AS release
ARG SECRET_KEY

# Set Working directory
WORKDIR /opt/webapp

# Add runtime user with respective access permissions
RUN groupadd -r django \
  && useradd -d /opt/webapp -r -g django django \
  && chown django:django -R /opt/webapp
USER django

# Copy virtual env from build stage
COPY --chown=django:django --from=build /.venv /.venv
ENV PATH="/.venv/bin:$PATH"

# Copy app source
COPY --chown=django:django . .

# COPY ./docker-celery/worker/start ./start-celeryworker
# RUN sed -i 's/\r$//g' ./start-celeryworker
# RUN chmod +x ./start-celeryworker

# COPY ./docker-celery/beat/start ./start-celerybeat
# RUN sed -i 's/\r$//g' ./start-celerybeat
# RUN chmod +x ./start-celerybeat

# COPY ./docker-celery/flower/start ./start-flower
# RUN sed -i 's/\r$//g' ./start-flower
# RUN chmod +x ./start-flower

# Collect static files and serve app
RUN python3 manage.py collectstatic --no-input
RUN python3 manage.py migrate
# RUN ./start-flower && ./start-celerybeat && ./start-celeryworker
# EXPOSE 5555
CMD waitress-serve --port=$PORT tiny_bird_36835.wsgi:application
