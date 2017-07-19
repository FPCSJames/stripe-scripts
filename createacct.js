/*
*  createacct.js
*  Utility for creating Stripe Connect managed accounts at the console (live mode)
*
*  Author: James M. Joyce
*  Copyright: 2016 Flashpoint Computer Services, LLC
*  License: MIT - https://fpcs.mit-license.org
*/

/* eslint-env node */
/* eslint no-console:0 */

'use strict';

var colors = require('colors/safe');
var prompt = require('prompt');
var stripe = require('stripe')('YOUR_STRIPE_PLATFORM_KEY_HERE');

prompt.message = '';
prompt.start();

prompt.get([
   {
      name: 'bizName',
      required: true,
      description: colors.cyan('Business name')
   },
   {
      name: 'bizEmail',
      required: true,
      description: colors.cyan('Business account email')
   },
   {
      name: 'bizStmtDesc',
      required: true,
      description: colors.cyan('Statement descriptor')
   },
   {
      name: 'bizTaxID',
      required: true,
      description: colors.cyan('Business tax ID')
   },
   {
      name: 'bizAddressLine1',
      required: true,
      description: colors.cyan('Business address line 1')
   },
   {
      name: 'bizAddressLine2',
      required: false,
      description: colors.cyan('Business address line 2')
   },
   {
      name: 'bizCity',
      required: true,
      description: colors.cyan('Business address city')
   },
   {
      name: 'bizState',
      pattern: /^[A-Z]{2}$/,
      message: 'Enter the two-digit abbreviation only.',
      required: true,
      description: colors.cyan('Business address state')
   },
   {
      name: 'bizZip',
      pattern: /^\d{5}$/,
      message: 'Enter the five-digit zip only.',
      required: true,
      description: colors.cyan('Business address zip')
   },
   {
      name: 'ownerFirstName',
      required: true,
      description: colors.cyan('Owner/legal rep first name')
   },
   {
      name: 'ownerLastName',
      required: true,
      description: colors.cyan('Owner/legal rep last name')
   },
   {
      name: 'ownerLastFour',
      pattern: /^\d{4}$/,
      message: 'Must be four digits.',
      required: true,
      description: colors.cyan('Owner/legal rep last four SSN')
   },
   {
      name: 'ownerDobDay',
      pattern: /^\d{2}$/,
      message: 'Must be two digits.',
      required: true,
      description: colors.cyan('Owner/legal rep DOB day')
   },
   {
      name: 'ownerDobMonth',
      pattern: /^\d{2}$/,
      message: 'Must be two digits.',
      required: true,
      description: colors.cyan('Owner/legal rep DOB month')
   },
   {
      name: 'ownerDobYear',
      pattern: /^\d{4}$/,
      message: 'Must be four digits.',
      required: true,
      description: colors.cyan('Owner/legal rep DOB year')
   },
   {
      name: 'bizBankAcct',
      pattern: /^\d+$/,
      message: 'Must be numbers only.',
      required: true,
      description: colors.cyan('Bank account number')
   },
   {
      name: 'bizRtgNum',
      pattern: /^\d{9}$/,
      message: 'Must be 9 digits.',
      required: true,
      description: colors.cyan('Bank routing number')
   }
], function(err, results) {
   if(!err) {
      stripe.accounts.create({
         managed: true,
         country: 'US',
         email: results.bizEmail,
         business_name: results.bizName,
         debit_negative_balances: true,
         statement_descriptor: results.bizStmtDesc,
         legal_entity: {
            address: {
               city: results.bizCity,
               country: 'US',
               line1: results.bizAddressLine1,
               line2: results.bizAddressLine2 || '',
               postal_code: results.bizZip,
               state: results.bizState
            },
            business_name: results.bizName,
            business_tax_id: results.bizTaxID,
            dob: {
               day: results.ownerDobDay,
               month: results.ownerDobMonth,
               year: results.ownerDobYear
            },
            first_name: results.ownerFirstName,
            last_name: results.ownerLastName,
            ssn_last_4: results.ownerLastFour,
            type: 'company'
         },
         external_account: {
            object: 'bank_account',
            account_number: results.bizBankAcct,
            routing_number: results.bizRtgNum,
            country: 'US',
            currency: 'USD'
         } // eslint-disable-next-line no-unused-vars
      }, function(err, account) {
         if(err) { // eslint-disable-next-line quotes
            console.log("\n"+err.message+"\n");
         } else { // eslint-disable-next-line quotes
            console.log("\nSuccess.\n");
         }
      });
   }
});
