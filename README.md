# NumberToText
Convert Number To String Support English And Arabic

# VueJs Setup

1- Add the file to the static folder 

# VueJS Code

2 - import the library 

```js
import Tafqeet from "@/static/tafqeet.js";
```
3 - create new instance 

```js
const taf = new Tafqeet();
```
4 - prepare the decimle settings 

```js
taf.settings({
  decimals: 2
});
```

# Finaly use the library with

- english use

```js
data(){

return {

number : taf.parse(32,"en")

}

}
```


- ar use

```js
data(){

return {

number : taf.parse(32,"ar")

}

}
```
