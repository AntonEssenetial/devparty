var gulp = require ('gulp'),
  watch = require ('gulp-watch'),
  connect = require ('gulp-connect'),
  jade = require ('gulp-jade'),
  stylus = require ('gulp-stylus'),
  nib = require('nib'),
  spritesmith = require('gulp.spritesmith');

// Функция для сборки спрайтов
gulp.task('sprite', function() {
  var spriteData = 
    gulp.src('assets/images/sprite/*.*') 
      .pipe(spritesmith({
          imgName: 'sprite.png',
          cssName: 'sprite.styl',
          cssFormat: 'stylus',
          algorithm: 'binary-tree',
          cssTemplate: 'stylus.template.mustache',
          cssVarMap: function(sprite) {
              sprite.name = 'sprite-' + sprite.name
          }
      }));
  spriteData.img.pipe(gulp.dest('dist/images/')); 
  spriteData.css.pipe(gulp.dest('stylus')); 
});

// Конект севрер
gulp.task('connect',function(){
  connect.server({
    root: 'dist',
    livereload: true,
    port: 1337
    })
  });

// Ну вот так
gulp.task('jade',function(){
  gulp.src('jade/*.jade')
    .pipe(jade({
      pretty: true
      }))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload())
  });

// А тут вот так
gulp.task('stylus', function(){
  gulp.src('stylus/*.styl')
    .pipe(stylus({
      use: nib(),
      compress: false
      }))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())
  });

// А вот тут по другому
gulp.task('watch',function(){
  gulp.watch('stylus/*.styl',['stylus']);
  gulp.watch('jade/*.jade',['jade']);
  gulp.watch('assets/images/sprite/*.*',['sprite']);
  });

// Таск по умолчанию
gulp.task('default',['connect','sprite','jade','stylus','watch']); 