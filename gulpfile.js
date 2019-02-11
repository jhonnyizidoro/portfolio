//Gulp
const { src, dest, series, task, watch, parallel } = require('gulp')
//Browsersync
browserSync = require('browser-sync').create()
//Clean
gulpClean = require('gulp-clean')
//Pump
pump = require('pump')
//Pug Tools
pugCompiler = require('gulp-pug')
pugErrorLogger = require('gulp-plumber')
//Sass tools
sassCompiler = require('gulp-sass')
sassPrefixer = require('gulp-autoprefixer')
//JS tools
jsBrowserify = require('browserify')
jsBabelify = require('babelify')
jsSource = require('vinyl-source-stream')
jsBuffer = require('vinyl-buffer')
jsUglify = require('gulp-uglify')
jsSourcemaps = require('gulp-sourcemaps')
jsCache = require('gulp-fs-cache')
//Image tools
imagemin = require('gulp-imagemin')
imageminPngquant = require('imagemin-pngquant')
imageminZopfli = require('imagemin-zopfli')
imageminMozjpeg = require('imagemin-mozjpeg')
imageminGiflossy = require('imagemin-giflossy')
imageminCache = require('gulp-cache')

//Limpa a pasta dist
task(clean = () => {
	return pump([
		src(['dist/images/**/*', '!dist/js/tmp/**/*'], {
			allowEmpty: true
		}),
		gulpClean({
			force: true,
		})
	])
})


//Converte o Sass em CSS
task(sass = () => {
	return pump([
		src('src/sass/app.sass'),
		sassCompiler({
			outputStyle: 'compressed',
			includePaths: ['node_modules']
		}).on('error', (error) => {
			errorFile = error.file.split('/')
			errorFile = errorFile[errorFile.length - 1]
			console.log('\x1b[41m%s\x1b[0m', `Erro na linha ${error.line} do arquivo ${errorFile}.\nErro: ${error.messageOriginal}`)
		}),
		sassPrefixer({
			grid: true,
			browsers: ['>1%'],
			cascade: false
		}),
		dest('dist/css'),
		browserSync.stream()
	])
})

//Converte JS Modular em JS interpretável pelos browsers
task(js = () => {
	jsFsCache = jsCache('dist/js/tmp')
	return pump([
		jsBrowserify({
			entries: 'src/js/app.js',
			debug: true,
			paths: ['./'],
			read: false,
		}).transform(jsBabelify, {
			presets: ['@babel/env']
		}).bundle(),
		jsSource('app.js'),
		jsBuffer(),
		jsSourcemaps.init({
			loadMaps: true
		}),
		jsFsCache,
		jsUglify(),
		jsFsCache.restore,
		jsSourcemaps.write('./tmp'),
		dest('dist/js')
	])
})

//Minifica as imagens
task(img = () => {
	return pump([
		src('src/images/**/*'),
		imageminCache(
			imagemin([
				imageminPngquant({
					speed: 1,
					quality: [0.3, 0.5]
				}),
				imageminZopfli({
					more: true
				}),
				imageminGiflossy({
					optimizationLevel: 3,
					optimize: 3,
					lossy: 2
				}),
				imagemin.jpegtran({
					progressive: true
				}),
				imageminMozjpeg({
					quality: 90
				})
			])
		),
		dest('dist/images')
	])
})

//Converte Pug/Jade em HTML
task(pug = () => {
	return pump([
		src('src/**/*.pug'),
		pugErrorLogger(),
		pugCompiler(),
		dest('dist')
	])
})

//Copia as pastas de assets, com exceção de 'sass', 'js' e 'images'
dirsToCopy = ['src/**/*', '!src/*.pug']
dontCopy = ['sass', 'js', 'images', 'views']
dontCopy.forEach(dirname => {
	dirsToCopy.push(`!src/${dirname}/**/*`)
	dirsToCopy.push(`!src/${dirname}`)
})
task(copy = () => {
	return pump([
		src(dirsToCopy, {
			base: 'src/'
		}),
		dest('dist/')
	])
})


//Inicia o watch nos arquivos
task(server = () => {
	browserSync.init({
		server: {
			baseDir: "./dist",
		},
		logLevel: 'silent',
	})
	watch('src/sass/**/*.sass', sass)
	watch('src/images/**/*', series(img, reload))
	watch('src/js/**/*.js', series(js, reload))
	watch('src/**/*.pug', series(pug, reload))
})

//Recarrega o browser
task(reload = done => {
	browserSync.reload()
	done()
})

//Limpa o cache das imagens
task(cacheClear = () => imageminCache.clearAll())

exports.watch = series(parallel(sass, js, img, pug, copy), server)
exports.build = series(parallel(cacheClear, clean), parallel(sass, js, img, pug, copy))