# eslint-plugin-barnacles

An opinionated set of rules aimed at enterprise-level projects. These types of projects often have many, many files so reading and grokking code becomes an exercise of time. Most of these rules are aimed at just that: saving microseconds at a time. Your future selves will thank me.

**UNDER CONSTRUCTION**

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-barnacles`:

```sh
npm install eslint-plugin-barnacles --save-dev
```

## Usage

Add `barnacles` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "barnacles"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "barnacles/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here
