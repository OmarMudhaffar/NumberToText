# NumberToText
Convert Number To String Support Both **English** And **Arabic**

# library Setup

` Add the file to the static folder `

# VueJS Code

2 - Import the library 

```js
import Tafqeet from "@/static/tafqeet.js";
```
3 - Create new instance.

```js
const taf = new Tafqeet();
```
4 - Prepare the decimle settings.

```js
taf.settings({
  decimals: 2
});
```

# Finaly Use The Library Insida **Data**

- **English** use

```js
data(){

return {

number : taf.parse(32,"en")

}

}
```


- **Arabic** use

```js
data(){

return {

number : taf.parse(32,"ar")

}

}
```
