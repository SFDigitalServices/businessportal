# Provisioning

Install knife solo and berkshelf via gem:

    $ sudo gem install knife-solo
    $ sudo gem install berkshelf

For a new server, create a json descriptor in the ```nodes/``` directory. See 107.170.235.186.json for a template.

First prepare the server:

    $ knife solo prepare root@107.170.235.186

Then "cook" it:

    $ knife solo cook root@107.170.235.186

You will only prepare once, but make sure it finishes. If there is any kind of error (like connectivity or memory),
first try to prepare the VM again. If it fails repeatedly, file an issue for this project with details.
