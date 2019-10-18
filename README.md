#Speech To Text For Kids
**Environment:** Java EE, Javascript, Maven

**IDE's used:** Eclipse 

**Java Servlet:** Jetty


##Notes
- Uses [Google Cloud Speech-to-Text API](https://cloud.google.com/speech-to-text/)
- Streams audio input from microphone to websocket to process input
- Requires SSL for microphone access

- *TODO: Migrate to Node.JS  or Python (I don't like Java but the [sample](https://codelabs.developers.google.com/codelabs/speaking-with-a-webpage/index.html#0) I followed was on Java)*
- *TODO: Move audio processing from Javascript to the backend. Don't be lazy tsss...*





## To start...

**Prerequisites**
- A [Google Developers](https://developers.google.com/) project
- [Google Cloud Speech-to-Text API](https://cloud.google.com/speech-to-text/) enabled on the project
- Service-to-service credentials (preferably in JSON)

*Note: Follow upto Step 3 of this [sample](https://codelabs.developers.google.com/codelabs/speaking-with-a-webpage/index.html#0) *



Define **GOOGLE_APPLICATION_CREDENTIALS** environment variable. [Read more here](https://cloud.google.com/docs/authentication/production)


For linux terminal, use:

```
$ export GOOGLE_APPLICATION_CREDENTIALS="./auth.json"
```


*TODO: Add build instructions. I forgot the build process for this and my environment was already setup so I didn't want to replicate it just yet since this is just a contest entry. Maven should do all the work AFAIK ^_^"*

Start server using Maven

```
$ mvn jetty:run
```

Note: App can be found (by default) in port **8443**. Make sure this is open or no other instances of Jetty is running for this project

Note: You may need to explicitly prepend ```https://...```.  I'll fix this in the Python version.


## Deploying to Heroku
[Refer to this](https://github.com/heroku/devcenter-jetty-runner)