import React,{useEffect} from 'react';
import { Typography } from '@mui/material';
import AuthService from '../../Services/AuthService';

const PrivacyPolicy = () => {

  const isAuthenticated = AuthService.checkUserAuthenticated();

  useEffect(() => {
    if (!isAuthenticated){
      navigator("/")   
    }
  },[isAuthenticated,navigator])
  return (
    <div style={{padding:"20px"}}>
    <Typography variant="authTitle">Privacy policy</Typography>
    <Typography>
    <Typography sx={{textDecoration:"underline",mt:3}}>Information Collection and Use</Typography>
    <Typography>ENBARR is the sole owner of the information collected on this site.  ENBARR will not sell, share, or rent this information to others in ways different from what is disclosed in this statement.  ENBARR collects information from our users at several different points on our app and website.</Typography>
    <Typography>Any and all ENBARR registered user or customer contact information, including but not limited to email addresses, phone numbers, or mailing addresses provided on the ENBARR site, is only for use by persons or entities interested in selling and/or buying the particular horse, product or service offered by the customer.  Unless arranged through ENBARR as an approved and bona fide special promotion, ENBARR's registered users or its customers' contact information may not be used or provided by anyone in the sale, purchase, promotion or solicitation of their business, products or services.   Any violation of this policy shall be considered theft of ENBARR's information.  However, ENBARR may, from time to time, in our sole discretion, share, lease or sell some of your personally identifiable information, including your name, phone number, mailing address or e-mail address, to special advertisers identified by us.</Typography>
    <Typography sx={{textDecoration:"underline",mt:3}}>Registration</Typography>
    <Typography>In order to use some of the services of this website, a user must first complete the Owner Information form.  During registration, users are required to give their contact information (such as name and email address).  This information is used to contact the user about the services on our site for which they have expressed interest.  Please note that the owner's email address and contact phone number will be displayed to our users.</Typography>
    <Typography sx={{textDecoration:"underline",mt:3}}>Order</Typography>
    <Typography>We request information from the user on our order form.  A user must provide contact information (like name and billing address) and financial information (like credit card number, expiration date). This information is used for billing purposes and to fill customer orders.  If we have trouble processing an order, this contact information is used to get in touch with the user.</Typography>
    <Typography sx={{textDecoration:"underline",mt:3}}>Cookies</Typography>
    <Typography>Some of our business partners use cookies on our site (for example, advertisers).  However, we have no access to or control over these cookies.</Typography>
    <Typography sx={{textDecoration:"underline",mt:3}}>Log Files</Typography>
    <Typography>We use IP addresses to analyze trends, administer the site, track user's movement, and gather broad demographic information for aggregate use.  IP addresses are not linked to personally identifiable information.</Typography>
    <Typography sx={{textDecoration:"underline",mt:3}}>Sharing</Typography>
    <Typography>We may share aggregated demographic information with our partners and advertisers.  This is not linked to any personal information that can identify any individual person.</Typography>
    <Typography sx={{textDecoration:"underline",mt:3}}>Sharing</Typography>
    <Typography>We may share aggregated demographic information with our partners and advertisers.  This is not linked to any personal information that can identify any individual person.</Typography>
    <Typography>We use a credit card processing company to bill users for goods and services.  These companies do not retain, share, store or use personally identifiable information for any secondary purposes.</Typography>
    <Typography>We may partner with other parties to provide specific services.  When the user signs up for these services, we will share names, or other contact information that is necessary for the third party to provide these services.  These parties are not allowed to use personally identifiable information except for the purpose of providing these services</Typography>
    <Typography sx={{textDecoration:"underline",mt:3}}>Links</Typography>
    <Typography>The ENBARR app and website contains links to other sites.  Please be aware that ENBARR is not responsible for the privacy practices of such other sites.  We encourage our users to be aware when they leave our site and to read the privacy statements of each and every web site that collects personally identifiable information.  This privacy statement applies solely to information collected by this website.</Typography>
    <Typography sx={{textDecoration:"underline",mt:3}}>Security</Typography>
    <Typography>This website takes every precaution to protect our users' information.  When users submit sensitive information via the website, your information is protected both online and offline.</Typography>
    <Typography>When our registration/order form asks users to enter sensitive information (such as credit card number), that information is encrypted and is protected with the best encryption software in the industry - SSL.  While on a secure page, such as our order form, the lock icon on the bottom of Web browsers such as Netscape Navigator and Microsoft Internet Explorer becomes locked, as opposed to un-locked, or open, when you are just 'surfing.'</Typography>
    <Typography>While we use SSL encryption to protect sensitive information online, we also do everything in our power to protect user-information offline.  All of our users' information, not just the sensitive information mentioned above, is restricted.</Typography>
    <Typography>If you have any questions about the security at our website, you can send an email to <span style={{backgroundColor:"yellow"}}>security@ENBARR.</span></Typography>
    <Typography sx={{textDecoration:"underline",mt:3}}>Newsletters and Special Offers</Typography>
    <Typography>We may send all new members a welcoming email to verify password and username.  Established members will occasionally receive our monthly newsletter and information on products, services, special deals, and a newsletter.  Out of respect for the privacy of our users we present the option to not receive these types of communications.  Please see the choice/opt-out section below.</Typography>
    <Typography sx={{textDecoration:"underline",mt:3}}>Site and Service Updates</Typography>
    <Typography>We also may send the user site and service announcement updates.  Members are not able to un-subscribe from service announcements, which contain important information about the service.  We communicate with the user to provide requested services and in regard to issues relating to their account via email or phone.</Typography>
    
    <Typography sx={{textDecoration:"underline",mt:3}}>Correction/Updating Personal Information</Typography>
    <Typography>If a user's personally identifiable information changes (such as your phone number or zip code), or if a user no longer desires our service, we will endeavor to provide a way to correct, update or remove that user's personal data provided to us.This can usually be done at the member information page or by emailing our Customer Support.<span style={{backgroundColor:"yellow"}}>User's can update their information by going to http://www.ENBARR or by emailing listings@ENBARR.</span></Typography>
    <Typography sx={{textDecoration:"underline",mt:3}}>Choice/Opt-out</Typography>
    <Typography>Users are given the opportunity to unsubscribe from our monthly newsletters and special offers email communications or they may send an email to <span style={{backgroundColor:"yellow"}}>subscribe@ENBARR</span>to have their email address removed from our database.  Please note that by using our service and posting classified ads, users will receive emails and/ or messages on the app from parties interested in the horse, product or service that user is advertising or seeking.</Typography>
    <Typography>Users of our site are always notified when their information is being collected by any outside parties.  We do this so our users can make an informed choice as to whether they should proceed with services that require an outside party.  You may choose that we not share, lease or sell your personally identifiable information with special advertisers by sending an e-mail to <span style={{backgroundColor:"yellow"}}>listings@ENBARR</span> and making that request.</Typography>
    <Typography sx={{textDecoration:"underline",mt:3}}>Notification of Changes</Typography>
    <Typography>If we decide to change our privacy policy, we will post those changes on our app and website homepage(s) so our users are always aware of what information we collect, how we use it, and under circumstances, if any, we disclose it.  If at any point we decide to use personally identifiable information in a manner different from that stated at the time it was collected, we will notify users by way of an email.  Users will have a choice as to whether we use their information in this different manner.  We will use information in accordance with the privacy policy under which the information was collected.</Typography>
    </Typography>
    </div>
  )
}

export default PrivacyPolicy