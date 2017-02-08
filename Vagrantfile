projectroot = '/home/vagrant'
drupalroot = '/home/vagrant/public/ccsf.vbox.local/www'


Vagrant.configure("2") do |config|

  config.berkshelf.enabled = true

  config.vm.box = "centos65"
  config.vm.box_url = "https://s3-us-west-2.amazonaws.com/misheska/vagrant/virtualbox4.3.6/centos65.box"

  config.vm.provider "virtualbox" do |v|
      v.memory = 3120
      v.cpus = 4
      v.customize ["modifyvm", :id, "--cpuexecutioncap", "100"]
    end


  #config.ssh.insert_key = true
  #config.ssh.forward_agent = true
  config.ssh.password = "vagrant"

  config.vm.network "forwarded_port", guest: 80, host: 7999
  config.vm.network "private_network", ip: "33.33.33.10"
  #config.vm.hostname = "ccsfdev"


  config.vm.synced_folder ".", "#{projectroot}"

  $provision_script= <<SCRIPT
  if [[ $(which chef-solo) != '/usr/bin/chef-solo' ]]; then
    curl -L https://www.opscode.com/chef/install.sh | sudo bash
    echo 'export PATH="/opt/chef/embedded/bin:$PATH"' >> ~/.bash_profile && source ~/.bash_profile
  fi
SCRIPT
  config.vm.provision :shell, :inline => $provision_script

  config.vm.provision :chef_solo do |chef|
    chef.json = {
      :hostname => "192.168.50.4",
      :fqdn => "ccsf.vbox.local",
      :basepath => "#{drupalroot}",
      :sql_dump => "#{projectroot}/db_dump/ccsf_6-4",
      :mysql => {
        :version => '5.1',
        :server_root_password => 'root',
        :server_debian_password => 'root',
        :server_repl_password => 'root',
        :tunable => {
          :max_allowed_packet => '256M'
        }
      },
      :drupal => {
        :drush => {
          :version => "6.2.0",
        },

      },
      'drupal-solr' => {
        :solr_version => "4.4.0",
        :drupal_root => "#{drupalroot}"
      }
    }
    chef.run_list = [
      "recipe[ccsf::default]"
    ]


  end

end
