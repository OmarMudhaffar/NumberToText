# NumberToText
Convert Number To String Support Both **English** And **Arabic**

# library Setup

` Add the file to the static folder `

# VueJS Code

2 - Import the library 

```js
import NumberToString from "@/static/NumberToString.js";
```
3 - Create new instance.

```js
const numberToText = new NumberToString();
```
4 - Prepare the decimle settings.

```js
numberToText.settings({
  decimals: 2
});
```

# Finaly Use The Library Insida **Data**

- **English** use

```js
data(){

return {

number : numberToText.parse(32,"en")

}

}
```


- **Arabic** use

```js
data(){

return {

number : numberToText.parse(32,"ar")

}

}
```
