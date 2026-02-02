---
title: How To Use Modulus for BigInteger in ColdFusion
description: While implementing a check digit routine for a 12-digit member number, precision issues with large numbers in ColdFusion are encountered, ultimately resolved by utilizing Java's BigInteger class for accurate modulus calculations.
last_updated_at: 2013-12-05T21:27:00
categories:
   - coldfusion
backgroundImage: /img/code/matrix-1799659.jpg
---

Recently while working on a project for a client, I was tasked with creating a member number against a check digit routine. I have done this a hundred times, I think, and this particular check digit routine was extra easy based on modulo operation. The client provided some documentation. However, that required dividing the body of the member number by the divisor and if the result was not zero, finding the integer value of the result, multiplying that by the divisor and subtracting from the member number. (Too much work when we have modulus at our disposal.)

Because this was so simple compared to other check digit routines, I didn’t think much of it and started making a method to validate the member number. Here were the business rules:

1. The member number is made up of 12 digits.
2. The member number has two components which are the body and the check digit.
    * The body is the first 11 digits.
    * The check digit is the last or 12th digit and based on modulo 7.

The method to calculate the check digit basically was to use body modulus 7 to get the check digit. Pretty straight forward and simple.

Here was my code the first time around.

```
component extends="base.Helper" {
	variables.modulo = 7;
/**
 * @output false
 * @returnType boolean
 * @access public
*/
	function validateMemberNumber( required string membernumber ) {
		if ( Len(arguments.membernumber) EQ 12 ) {
			var checkDigit = Right(arguments.membernumber, 1);
			var body = Left(arguments.membernumber, 11);
			return body mod variables.modulo EQ checkDigit;
		}
		return false;
	}
}
```

I ran the first test and BAM, a Coldfusion error, was thrown.

```
Cannot convert the value 1.0009750886E10 to an integer because it cannot fit inside an integer.
```

Coldfusion is typeless and usually can handle larger numbers, but it handles the large numbers by converting numeric values into strings. Coldfusion then uses its own library to handle math operations based on these strings. As it turns out, Coldfusion stores these large values in scientific notation, and as a result, we start to lose precision. That is not what is causing the error, though, for us, but without the error, we would have run into problems later.

Java to the rescue.

```
	variables.modulo = 7;
/**
 * @output false
 * @returnType boolean
 * @access public
*/
	function validateMemberNumber( required string membernumber ) {
		if ( Len(arguments.membernumber) EQ 12 ) {
			var bigInt = createObject("java", "java.math.BigInteger");
			var checkDigit = Right(arguments.membernumber, 1);
			var body = bigInt.init( JavaCast("String", "#Left(arguments.membernumber, 11)#"));
			return body.remainder( variables.modulo ) EQ checkDigit;
		}
		return false;
	}
```

This too failed. What the heck was going on? What do you mean you can’t find the reminder method?

```
Root Cause: The remainder method was not found.
```

I am still a beginner when it comes to java, but I was sure I saw the remainer() method available under BigInteger, so what was going on. I quickly dumped java.math.BigInteger() to the page and saw that divisor also must be a BigInteger and not integer as I was passing. Rookie 
 mistake, I guess, easily corrected by updating variables.modulo.

```
variables.modulo = createObject("java", "java.math.BigInteger").valueOf("7");
```

Now with the `variables.modulo` defined as a BigInteger, I had resolved the issue. When we call the validateMemberNumber() method, we first check the length of the string (we treat the member number as a string to handle any leading zeros). If the length is correct, we set up the java math component bigInt, the checkDigit and the body (using bingInt). To validate, we simply use the remainder() method of BigInteger and test for equality with the checkDigit.

Hope that helps anyone to run into the issues trying to use modulus on a big integer.
