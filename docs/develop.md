# Development

VirtualBox Vagrant Chef Drupal install


# How
1. Download and Install [VirtualBox](http://www.virtualbox.org/) (ensure you are on the latest version 4.0.8+)
2. Install [vagrant](http://vagrantup.com/v1/docs/getting-started/index.html)
3. Install vagrant plugins for berkshelf and omnibus

    $ vagrant plugin install vagrant-berkshelf --plugin-version '>= 2.0.1'
    
    $ vagrant plugin install vagrant-omnibus

4. Download or clone this project. Launch the VM from the home directory:

    $ cd [vagrant project directory];
    
    $ vagrant up
    
    $ vagrant ssh
    
5. Import database
  
    $ mysql -u root -p < db_dump/latest.sql

5. Add this line to your /etc/hosts (or windows equivalent):


    33.33.33.10        ccsf




That's it, files in "public" are served here : [http://ccsf/](http://ccsf/)

To connect to the console of you instance:
    `vagrant ssh`



--------

You can add `XDEBUG_PROFILE` to your GET parameter to generate an xdebug profile, e.g. [http://ccsf/?XDEBUG_PROFILE](http://ccsf/?XDEBUG_PROFILE)

You can then investigate at [http://ccsf/webgrind/](http://ccsf/webgrind/)



