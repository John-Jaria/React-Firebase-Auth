import React from 'react'
import Navbar from './Navbar'
import GooglePayButton from '@google-pay/button-react';


export default function Pay() {
  return (
    <div class="bg-right">
    <div class="container-fluid mt-5">
        <div class="row">
            <div class="col-md-10 col-11 mx-auto">
    
                <div class="row">
                   {/* */}
                   <Navbar/>
                    <div class="col-lg-7 col-md-8 ">
                    <div class="card">
                       
                                <div class="card-body tab-content border-0">
                                <div class="tab-pane active" id="profile">
                                    <h1>Pay Loan
                                    </h1>
                                    <form>
                                            <label for="formGroupExampleInput" class="form-label">Enter Loan ID</label>
                                            <input type="text" class="form-control" id="formGroupExampleInput"/>

                                            <label for="formGroupExampleInput" class="form-label">Enter Amount</label>
                                            <input type="text" class="form-control mb-3" id="formGroupExampleInput"/>

                                            <GooglePayButton
        environment="TEST"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: 'CARD',
              parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['MASTERCARD', 'VISA'],
              },
              tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                  gateway: 'example',
                  gatewayMerchantId: 'exampleGatewayMerchantId',
                },
              },
            },
          ],
          merchantInfo: {
            merchantId: '12345678901234567890',
            merchantName: 'Demo Merchant',
          },
          transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPriceLabel: 'Total',
            totalPrice: '1',
            currencyCode: 'USD',
            countryCode: 'US',
          },
          shippingAddressRequired: true,
          callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
        }}
        onLoadPaymentData={paymentRequest => {
          console.log('Success', paymentRequest);
        }}
        onPaymentAuthorized={paymentData => {
            console.log('Payment Authorised Success', paymentData)
            return { transactionState: 'SUCCESS'}
          }
        }
        onPaymentDataChanged={paymentData => {
            console.log('On Payment Data Changed', paymentData)
            return { }
          }
        }
        existingPaymentMethodRequired='false'
        buttonColor='white'
        buttonType='pay'
      />
                                            
                                        </form>


                                </div>
                                
                            
                             
                                
                    </div>
                    </div>
                    
                </div>

                </div>
                
            </div>
        </div>

    </div>
    
</div>
  )
}
