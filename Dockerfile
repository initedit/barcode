FROM httpd
COPY index.html /usr/local/apache2/htdocs/
COPY assets /usr/local/apache2/htdocs/assets