/*
*  reverse_transfer.js
*  Utility to reverse a transfer in a specified amount and proportionally refund the application fee.
*
*  Author: James M. Joyce
*  Copyright: 2017 Flashpoint Computer Services, LLC
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
      name: 'transferID',
      required: true,
      description: colors.cyan('Transfer ID')
   },
   {
      name: 'amount',
      required: true,
      description: colors.cyan('Amount to reverse in cents')
   }
], function(err, results) {
   if(!err) {
      stripe.transfers.createReversal(
         results.transferID,
         {
            amount: results.amount,
            refund_application_fee: true
         },  // eslint-disable-next-line no-unused-vars
         function(err, reversal) {
            if(err) { // eslint-disable-next-line quotes
               console.log("\n"+err.message+"\n");
            } else { // eslint-disable-next-line quotes
               console.log("\nSuccess.\n");
            }
         }
      );
   }
});
