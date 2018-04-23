# Node Apps

This is a simple tutorial to show you how to create your own postgres image with [Docker](https://www.docker.com/), run a docker container and run either a rest api or a graphql api, both done with [Nodejs](https://nodejs.org/).

Pre Requirements
-
You must have docker already installed in your machine. Whether you need some help, just follow up [this tutorial](https://docs.docker.com/install/).

Getting started
=

> Some docker commands below, may be only permitted with `sudo` command. Unless you follow the Docker's post install [instructions](https://docs.docker.com/install/linux/linux-postinstall/) (Considering you are using Linux).

First, let's create our docker image, with a postgres image ready to be used. On the case below, `docker-postgres` is the name that I chose. Just run it into the project folder.

Create docker image
-
```
docker build -t docker-postgres .
```


Ok, we have our image already created. You can confirm it running:

Check docker images already created
-
```
docker image ls
```

Your return will be something like this:

```
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
docker-postgres     latest              540d7cb6e229        45 minutes ago      397MB
```

Cool, everything is ok for while. We have our image and we confirmed it.

Now, let's create our first container. I will call it as `docker-pg`. The container that will have all the content from our `docker-postgres` image.

To create our container
-
```
docker run -d -p 5432:5432 --name docker-pg docker-postgres
```

Perfect! We have our container already running! We can check it out basically running the following command:
```
docker ps
```
or
```
docker container ls
```

Our both applications can run normally now, because we are able to connect in a postgres database.

Go into any node app you want, and run `yarn start`. (Rest API on port 3000 and Graphql API on port 3001)

Enjoy!
