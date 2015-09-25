var gulp = require('gulp');
var concat = require('gulp-concat');
var ts = require('gulp-typescript');
var connect = require('gulp-connect');

var config = {
    tsApp: 'src/**/*.ts',
    jsAppFilename: 'app.js',
    tsAppOutput: 'public/app',

    jsVendors: [
        'node_modules/angular2/bundles/angular2.dev.js',
        'node_modules/angular2/bundles/router.dev.js'
    ],
    jsVendorFilename: 'vendor.js',
    jsOutput: 'public/js',

    index: 'src/index.html',
    indexOutput: 'public',

    // lessFile: 'less/main.less',
    cssFilename: 'main.css',
    cssOutput: 'public/css',
    serverConfig: {

    }
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

// Build Index
gulp.task('build:app', function() {
    return gulp.src(config.tsApp)
        .pipe(ts({
            noImplicitAny: true,
            module: 'commonjs',
            target: 'ES5',
            experimentalDecorators: true,
            emitDecoratorMetadata: true
        }))
        .pipe(gulp.dest(config.tsAppOutput))
        .pipe(connect.reload());
});

gulp.task('build:watch', function() {
    gulp.watch('src/*.ts', ['build:app']);
    // return gulp.src(config.tsApp)
    //     .pipe(ts({
    //         watch: true,
    //         noImplicitAny: true,
    //         module: 'commonjs',
    //         target: 'ES5',
    //         experimentalDecorators: true,
    //         emitDecoratorMetadata: true
    //     }))
    //     .pipe(gulp.dest(config.tsAppOutput));
});

// Build styles
gulp.task('build:styles', function() {
    // return gulp.src(config.lessFile)
    //     .pipe(less(config.cssFilename))
    //     .pipe(gulp.dest(config.cssOutput));
});

// Server
gulp.task('serve', function() {
    connect.server({
        root: config.indexOutput,
        port: 4200,
        livereload: true
        // middleware: function() {
        //     return [
        //         (function() {
        //             var url = require('url');
        //             var proxy = require('proxy-middleware');
        //             var options = url.parse(config.serverConfig.server);
        //             options.route = '/back';
        //             return proxy(options);
        //         })()
        //     ];
        // }
    });
});

gulp.task('build', [
    'build:index', 'build:app', 'build:js:vendors', 'build:styles'
]);

gulp.task('default', ['build']);
gulp.task('watch', ['serve', 'build:watch']);
