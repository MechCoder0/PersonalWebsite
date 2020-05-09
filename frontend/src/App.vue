<template>
  <div id="app">
    <head>
      <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro|Handlee|Pacifico" rel="stylesheet">
    </head>
    <div id="nav" class="navigation">
      <router-link to="/">Home</router-link> |
      <router-link to="/computers">Computers</router-link> |
      <router-link to="/cellphones">Cellphones</router-link> |
      <router-link to="/resources">Resources</router-link> |
      <router-link to="/breakout">Breakout</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
  @import './assets/styles/main.css';
</style>