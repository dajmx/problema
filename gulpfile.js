
const {src, dest, watch, series, parallel} = require ('gulp')
//CSS Y SASS
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer');
// Imagenes
const imagemin = require('gulp-imagemin')

//copilar sass
// pasos: identificar archivo 2.copilarla 3.guardar el .css
function css(done){
    src('src/scss/app.scss')
        .pipe(sass({outputStyle:'expanded'}))
        .pipe(postcss([autoprefixer()]))
        .pipe(dest('build/css'))
    done();
}

function imagenes(){
    
    return src('src/img/**/*')
        .pipe(imagemin({optimizationlevel:1}))
        .pipe(dest('build/img'));
        
    
}

function dev(){
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes)
}



exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;

exports.default = series(imagenes,css,dev);

// series - se inicia una tarea, y hasta que finaliza, inicia la siguienta
//parallel-Todas Inician al mismo tiempo