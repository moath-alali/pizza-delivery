<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Pizza delivery</title>

        <!-- Fonts -->
        <link type="text/css" href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

        <!-- Styles -->
        <link type="text/css" href="/css/app.css" rel="stylesheet">
        <link rel="icon" href="{{ URL::asset('/css/favicon.png') }}" type="image/x-icon"/>
    </head>
    <body>
        <div id="app"></div>
        <script src="/js/app.js"></script>
    </body>
</html>
