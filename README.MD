# CheckPAC

A simple array of validation tools for PAC and STAC codes, as defined by the _Mobile Number Portability Operator Steering Group_. These one-time use codes are provided by mobile network operators in the UK, as required by Ofcom, to "port" a mobile number to another network, in effect allowing a customer to use their old phone number with a different network. This tool also provides metadata relating to the provided code, built from a database by hand (from searching on google).

This package aims to follow a structure similar to libphonenumber-js, providing the following methods:

* Validate a complete PAC/STAC number, optionally with metadata, optionally only PAC or STAC
* Check-as-you-type
* Validate SP (service provider) identifiers

**This package will not check whether the code is active and usable; merely that it is in the correct format.**

## PAC/STAC TL;DR

PACs (Porting Authorisation Codes) and STACs (Service Termination Authorisation Codes, also known as N-PACs) are tokens SP (Mobile Networks a.k.a Service Providers) customers can request when leaving their provider in order to easily cancel their contract and (optionally) "port" their number. The specifics of how they're generated and managed are discussed in [the manual](https://mnposg.org.uk/wp/wp-content/uploads/2020/04/MNP2-Manual-issue-2.86.pdf) published by the steering group that created the system. The whole system is managed by Ofcom, the UK's regulator and watchdog for communications.

The codes comprise of two components: the SP identifier, which is three letters long, and the unique code, which is six digits long. PAC codes are in that order STAC codes are the opposite. The customer obtains the code by texting the 65075/75075 service or by requesting a code through customer services. The code is issued instantly and is valid for 30 calendar days.

This tool validates the SP identifier against a list collected from across the internet, and validates the length of the unique code.

## Installation

```shell
yarn add checkpac
```

Instructions for using client-side with unpkg etc coming soon...

## Development notes

> This project is a work in progress

* Make sure to run `tsc` before pushing. Should probably be part of the commit process.

## Example usage

### React

```jsx
import React, { useCallback, useState } from "react";
import validate from "checkpac";

const ExampleForm = props => {
  const [authForm, updateAuthForm] = useState({});

  const onSubmit = useCallback(() => {
    const success = validate(authForm.code);
    if (success) {
      // dispatch some api action
    } else {
      // show error messages in form
    }
  }, []);

  return (
    <div>
      <form name="authForm" onSubmit={e => e.preventDefault()}>
        <label htmlFor="code">Enter your PAC/STAC code</label>
        <input name="code" placeholder="AAA123456" onChange={e => updateAuthForm({ ...authForm, code: e.target.value })} />
        <input type="submit" value="Next" onPress={onSubmit}>
      </form>
    </div>
  );
};

export default ExampleForm;
```

### Formik / Yup React example

to-do

### Angular example

to-do

### Vanilla JS browser example

to-do
