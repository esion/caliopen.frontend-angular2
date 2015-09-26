var gulp = require('gulp');
var concat = require('gulp-concat');
var ts = require('gulp-typescript');
var server = require('gulp-express');
var sass = require('gulp-sass');

var config = {
    tsApp: 'app/**/*.ts',
    jsAppFilename: 'app.js',
    tsAppOutput: 'public/app',

    jsVendors: [
        'node_modules/angular2/bundles/angular2.dev.js',
        'node_modules/angular2/bundles/router.dev.js'
    ],
    jsVendorFilename: 'vendor.js',
    jsOutput: 'public/js',

    index: 'app/index.html',
    indexOutput: 'public',

    sassFile: 'app/styles/app.scss',
    sassFiles: 'app/styles/**/*.scss',
    cssFilename: 'main.css',
    cssOutput: 'public/css',
    assets: 'app/assets/**/*.*'
};

// Build JS Vendors
gulp.task('build:js:vendors', function() {
    return gulp.src(config.jsVendors)
        .pipe(concat(config.jsVendorFilename))
        .pipe(gulp.dest(config.jsOutput));
});

// Build Index
gulp.task('build:index', function() {
    return gulp.src(config.index)
        .pipe(gulp.dest(config.indexOutput));
});

// Build app
gulp.task('build:app', function() {
    return gulp.src(config.tsApp)
        .pipe(ts({
            noImplicitAny: true,
            module: 'commonjs',
            target: 'ES5',
            experimentalDecorators: true,
            emitDecoratorMetadata: true
        }))
        .pipe(gulp.dest(config.tsAppOutput));
});

// Build styles
gulp.task('build:styles', function() {
    return gulp.src(config.sassFile)
        .pipe(sass(config.cssFilename).on('error', sass.logError))
        .pipe(gulp.dest(config.cssOutput));
});

//build assets
gulp.task('build:assets', function() {
    return gulp.src(config.assets)
        .pipe(gulp.dest(config.indexOutput));
});

//watches
gulp.task('build:watch', function() {
    gulp.watch('app/index.html', ['build:index']);
    gulp.watch('app/*.ts', ['build:app']);
    gulp.watch(config.sassFiles, ['build:styles']);
    gulp.watch('app/assets/**/*.*', ['build:assets']);
});


// Server
gulp.task('serve', function () {
    server.run(['server/index.js']);
});

gulp.task('build', [
    'build:index', 'build:app', 'build:js:vendors', 'build:styles', 'build:assets'
]);

gulp.task('default', ['build']);
gulp.task('watch', ['serve', 'build:watch']);
