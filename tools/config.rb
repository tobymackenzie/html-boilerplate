#==dependencies
require 'sass-css-importer'
require 'sass-globbing'

#==paths
http_path = "/"
css_dir = "../web/_/styles/dev"
sass_dir = "../web/_/styles/src"
#images_dir = "images"
#javascripts_dir = "scripts"

#==compilation
#--output style
#-# for dev.  overridden by grunt task for prod
#-# output_style = :expanded or :nested or :compact or :compressed
output_style = :nested

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
