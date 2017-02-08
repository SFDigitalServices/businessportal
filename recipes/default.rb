#
# Cookbook Name:: ccsf
# Recipe:: default
#
# Copyright (C) 2014 Tomorrow Partners
#
# All rights reserved - Do Not Redistribute

include_recipe %w{apache2 apache2::mod_php5 apache2::mod_rewrite apache2::mod_expires}
include_recipe %w{php php::module_mysql php::module_gd}
include_recipe "git"
include_recipe "postfix"
include_recipe "drupal::drush"

# Centos does not include the php-dom extension in it's minimal php install.
case node['platform_family']
when 'rhel', 'fedora'
  package 'php-xml' do
    action :install
  end
  package 'php-mbstring' do
    action :install
  end
end

include_recipe "mysql::server"
include_recipe "mysql::client"
include_recipe "database::mysql"
include_recipe "php"
include_recipe "drupal"
include_recipe "solr"



#directory "#{node['basepath']}/sites/default/files" do
#  mode "0777"
#  action :create
#end

web_app "ccsf" do
  server_name node['hostname']
  server_aliases [node['fqdn']]
  docroot node['basepath']
end

#template "#{node[:tomcat][:base]}/solr/conf/solrconfig.xml" do
#  source "solrconfig.xml.erb"
#  owner "#{node[:tomcat][:user]}"
#  group "#{node[:tomcat][:user]}"
#  mode 0644
#  notifies :restart, "service[tomcat]"
#  not_if "test -f #{node[:tomcat][:base]}/solr/conf/solrconfig.xml"
#  retries 10
#  retry_delay 10
#end

remote_directory "/etc/solr/collection1/conf" do
  owner "root"
  group "root"
  mode 00755
  source "solr"
  notifies :restart, "service[solr]"
end


mysql_connection_info = {
  :host => "localhost",
  :username => 'root',
  :password => node['mysql']['server_root_password']
}

mysql_database "ccsf_preview" do
  connection mysql_connection_info
  action [:drop, :create]
end

#mysql_database "ccsf_preview" do
#  connection mysql_connection_info
#  sql "source #{sql_dump};"
#  sql "update users set pass = '$S$Dg.Wd4tbIHxkgwN3gA8NdzXN7rKZgxRxpYWa8OGJDCHhnISLaOR4' where uid=1;"
#end
# better
# drush upwd user --password=pass

