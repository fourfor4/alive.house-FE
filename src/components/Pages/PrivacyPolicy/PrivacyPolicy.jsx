import React, { useEffect } from "react";
import TriBorder from "../../../assets/comps/TriBorder/TriBorder";
import Nav from "../HomeScreenPage/components/Nav";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Nav />
      <div className="w-screen h-fit min-h-screen flex flex-col justify-start items-center">
        <div className="w-full alivebottomborder h-[250px] bg-gray flex flex-col justify-center items-center">
          <h1 className="text-[80px] text-yellow ">privacy policy</h1>
          <p className="text-[16px] text-white">
            This policy is effective as of 2 August 2022.
          </p>
          <p className="text-[16px] text-white">
            Last updated on 2 August 2022.
          </p>
        </div>
        {/* <TriBorder height="54px" /> */}
        <div className="w-[70%] h-fit min-h-screen mt-[12rem] pl-2 mb-10">
          <p className="text-[16px]">
            Your privacy is important to us. It is A.live&rsquo;s policy to
            respect your privacy and comply with any applicable law and
            regulation regarding any personal information we may collect about
            you, including across our website, https://alive.house, and other
            sites we own and operate (&ldquo;the Platform&rdquo;).
          </p>

          <p className="text-[16px]">
            In the event the Platform contains links to third-party sites and
            services, please be aware that those sites and services have their
            own privacy policies. After following a link to any third-party
            content, you should read their posted privacy policy information
            about how they collect and use personal information. This Privacy
            Policy does not apply to any of your activities after you leave the
            Platform.
          </p>

          <p className="text-[32px] text-green my-10 font-bold">
            I.&nbsp;&nbsp; &nbsp;Information We Collect
          </p>

          <p className="text-[16px]">
            Information we collect falls into one of two categories:
            &ldquo;voluntarily provided&rdquo; information and
            &ldquo;automatically collected&rdquo; information.
            <br />
            &ldquo;Voluntarily provided&rdquo; information refers to any
            information you knowingly and actively provide us when using or
            participating in the Platform.
            <br />
            &ldquo;Automatically collected&rdquo; information refers to any
            information automatically sent by your devices in the course of
            accessing the Platform.
          </p>

          <p className="text-[20px] my-10 text-gray font-bold">
            <br />
            A.&nbsp;&nbsp; &nbsp;Personal Information
          </p>

          <p className="text-[16px]">
            Personal information is any information about you which can be used
            to identify you as an individual. This includes information about
            you as a person (such as name, address, and date of birth), your
            devices, payment details (including details about your
            crypto-wallet), and information about how you use the
            Platform.&nbsp;
          </p>

          <p className="text-[16px]">
            More specifically, the Platform collects personal information,
            including:
          </p>

          <p className="text-[16px]">
            &bull;&nbsp;&nbsp; &nbsp;Name
            <br />
            &bull;&nbsp;&nbsp; &nbsp;E-mail address
            <br />
            &bull;&nbsp;&nbsp; &nbsp;Date of birth
            <br />
            &bull;&nbsp;&nbsp; &nbsp;Phone/ mobile number
            <br />
            &bull;&nbsp;&nbsp; &nbsp;Username and password
            <br />
            &bull;&nbsp;&nbsp; &nbsp;Crypto wallet address, including related
            data used to detect cryptocurrency and NFT holdings
            <br />
            &bull;&nbsp;&nbsp; &nbsp;Social media handle
            <br />
            &bull;&nbsp;&nbsp; &nbsp;Details about your activity on the
            Platform, such as artists followed, NFT transactions, and avatars
            created
          </p>

          <p className="text-[20px] my-10 text-gray font-bold">
            <br />
            B.&nbsp;&nbsp; &nbsp;Log Data
          </p>

          <p className="text-[16px]">
            When you visit the Platform, our servers may automatically log the
            standard data provided by your web browser. It may include your
            device&rsquo;s Internet Protocol (IP) address, your browser type and
            version, the pages you visit, the time and date of your visit, the
            time spent on each page, and other details about your visit.&nbsp;
          </p>

          <p className="text-[16px]">
            Additionally, if you encounter certain errors while using the site,
            we may automatically collect data about the error and the
            circumstances surrounding its occurrence. This data may include
            technical details about your device, what you were trying to do when
            the error happened, and other technical information relating to the
            problem. You may or may not receive notice of such errors, even in
            the moment they occur, that they have occurred, or what the nature
            of the error is.
          </p>

          <p className="text-[16px]">
            Please be aware that while this information may not be personally
            identifying by itself, it may be possible to combine it with other
            data to personally identify individual persons.
          </p>

          <p className="text-[20px] my-10 text-gray font-bold">
            <br />
            C.&nbsp;&nbsp; &nbsp;Device Data
          </p>

          <p className="text-[16px]">
            When you visit the Platform or interact with it, we may
            automatically collect data about your device, such as:
            <br />
            &bull;&nbsp;&nbsp; &nbsp;Device Type
            <br />
            &bull;&nbsp;&nbsp; &nbsp;Operating System
            <br />
            &bull;&nbsp;&nbsp; &nbsp;Unique device identifiers
            <br />
            &bull;&nbsp;&nbsp; &nbsp;Device settings
            <br />
            &bull;&nbsp;&nbsp; &nbsp;Geo-location data
          </p>

          <p className="text-[16px]">
            Data we collect can depend on the individual settings of your device
            and software. We recommend checking the policies of your device
            manufacturer or software provider to learn what information they
            make available to us.
          </p>

          <p className="text-[20px] my-10 text-gray font-bold">
            <br />
            D.&nbsp;&nbsp; &nbsp;User-Generated Content
          </p>

          <p className="text-[16px]">
            We consider &ldquo;user-generated content&rdquo; to be materials
            (text, image and/or video content) voluntarily supplied to us by our
            users for the purpose of publication on the Platform or
            re-publishing on our social media channels. All user-generated
            content is associated with the account or email address used to
            submit the materials.
          </p>

          <p className="text-[16px]">
            Please be aware that any content you submit for the purpose of
            publication will be available to anyone who has access to the
            Platform after such content is published on the Platform, including
            but not limited to third parties not covered under this privacy
            policy.
          </p>

          <p className="text-[32px] text-green my-10 font-bold">
            II.&nbsp;&nbsp; &nbsp;Collection and Use of Information
          </p>

          <p className="text-[16px]">
            We may collect personal information from you when you do any of the
            following on our website:
            <br />
            &bull;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;Register for an account
            <br />
            &bull;&nbsp;&nbsp; &nbsp;Sign up to receive updates from us via
            email or social media channels
            <br />
            &bull;&nbsp;&nbsp; &nbsp;Use a mobile device or web browser to
            access our content
            <br />
            &bull;&nbsp;&nbsp; &nbsp;Contact us via email, social media, or on
            any similar technologies
            <br />
            &bull;&nbsp;&nbsp; &nbsp;When you mention us on social media
          </p>

          <p className="text-[16px]">
            We receive your personal information from other sources, for
            example, crypto wallet providers, when they share the information
            with us.
          </p>

          <p className="text-[16px]">
            We need to collect personal information in order to provide you with
            access to and use of the Platform and related services. If you do
            not provide the information requested, we may not be able to provide
            you such access. If you disclose any personal information relating
            to other people to us or to our service providers in connection with
            using the Platform, you represent that you have the authority to do
            so and to permit us to use the information in accordance with this
            Privacy Policy.
          </p>

          <p className="text-[16px]">
            We may collect, hold, use, and disclose information for the
            following purposes, and personal information will not be further
            processed in a manner that is incompatible with these purposes:
          </p>

          <p className="text-[16px]">
            &bull;&nbsp;&nbsp; &nbsp;To provide you with the Platform&rsquo;s
            core features and services
            <br />
            &bull;&nbsp;&nbsp; &nbsp;To enable you to customize or personalize
            your experience of the Platform
            <br />
            &bull;&nbsp;&nbsp; &nbsp;To contact and communicate with you
            <br />
            &bull;&nbsp;&nbsp; &nbsp;To enable you to access and use the
            Platform, associated applications, and associated social media
            platforms
            <br />
            &bull;&nbsp;&nbsp; &nbsp;For internal record keeping and
            administrative purposes
            <br />
            &bull;&nbsp;&nbsp; &nbsp;To comply with our legal obligations and
            resolve any disputes that we may have
            <br />
            &bull;&nbsp;&nbsp; &nbsp;To attribute any content (e.g. posts and
            comments) you submit / create and that we publish on the Platform
            <br />
            &bull;&nbsp;&nbsp; &nbsp;For security and fraud prevention, and to
            ensure that the Platform safe, secure, and used in line with our
            Terms of Use.
          </p>

          <p className="text-[16px]">
            In providing access to the Platform, we may also disclose personal
            information to our third party service providers, to facilitate
            services they provide to the Platform. These can include providers
            of services such as website hosting, data analysis, fraud
            prevention, information technology and related infrastructure
            provision, customer service or related benefits, email delivery,
            auditing, and other services.
          </p>

          <p className="text-[16px]">
            We may combine voluntarily provided and automatically collected
            personal information with general information or research data we
            receive from other trusted sources. For example, our marketing and
            market research activities may uncover data and insights, which we
            may combine with information about how visitors use our site to
            improve the Platform and your experience on it.
          </p>

          <p className="text-[16px]">
            We also use and disclose your personal information as necessary or
            appropriate, in particular when we have a legal obligation or
            legitimate interest to do so:
          </p>

          <p className="text-[16px]">
            &bull;&nbsp;&nbsp; &nbsp;To comply with applicable law and
            regulations. This may include laws outside your country of
            residence.
            <br />
            &bull;&nbsp;&nbsp; &nbsp;To cooperate with public and government
            authorities. To respond to a request or to provide information we
            believe is necessary or appropriate. These can include 
            &nbsp;authorities outside your country of residence.
            <br />
            &bull;&nbsp;&nbsp; &nbsp;To cooperate with law enforcement. For
            example, when we respond to law enforcement requests and orders or
            provide information we believe is important.
            <br />
            &bull;&nbsp;&nbsp; &nbsp;To enforce our terms and conditions; and
            <br />
            &bull;&nbsp;&nbsp; &nbsp;To protect our rights, privacy, safety or
            property, and/or that of our affiliates, you or others.
          </p>

          <p className="text-[20px] my-10 text-gray font-bold">
            <br />
            Business Transfers
          </p>

          <p className="text-[16px]">
            If we or our assets are acquired, or in the unlikely event that we
            go out of business or enter bankruptcy, we would include data,
            including your personal information, among the assets transferred to
            any parties who acquire us. You acknowledge that such transfers may
            occur, and that any parties who acquire us may, to the extent
            permitted by applicable law, continue to use your personal
            information according to this policy, which they will be required to
            assume as it is the basis for any ownership or use rights we have
            over such information.
          </p>

          <p className="text-[32px] text-green my-10 font-bold">
            III.&nbsp;&nbsp; &nbsp;Legal Bases for Processing Your Personal
            Information
          </p>

          <p className="text-[16px]">
            We will only collect and use your personal information when we have
            a legal right to do so. In which case, we will collect and use your
            personal information lawfully, fairly, and in a transparent manner.
            If we seek your consent to process your personal information, and
            you are under 16 years of age, we will seek your parent or legal
            guardian&rsquo;s consent to process your personal information for
            that specific purpose.
          </p>

          <p className="text-[16px]">
            Our lawful bases depend on the services you use and how you use
            them. This means we only collect and use your information on the
            following grounds:
          </p>

          <p className="text-[20px] my-10 text-gray font-bold">
            <br />
            A.&nbsp;&nbsp; &nbsp;Consent From You
          </p>

          <p className="text-[16px]">
            Where you give us consent to collect and use your personal
            information for a specific purpose. You may withdraw your consent at
            any time using the facilities we provide; however this will not
            affect any use of your information that has already taken place. You
            may consent to providing your email address for the purpose of
            receiving marketing emails from us. While you may unsubscribe at any
            time, we cannot recall any email we have already sent. If you have
            any further enquiries about how to withdraw your consent, please
            feel free to enquire using the details provided in the Contact Us
            section of this privacy policy.
          </p>

          <p className="text-[20px] my-10 text-gray font-bold">
            <br />
            B.&nbsp;&nbsp; &nbsp;Performance of a Contract or Transaction
          </p>

          <p className="text-[16px]">
            Where you have entered into a contract or transaction with us, or in
            order to take preparatory steps prior to our entering into a
            contract or transaction with you. For example, if you contact us
            with an enquiry, we may require personal information such as your
            name and contact details in order to respond.
          </p>

          <p className="text-[20px] my-10 text-gray font-bold">
            <br />
            C.&nbsp;&nbsp; &nbsp;Our Legitimate Interests
          </p>

          <p className="text-[16px]">
            Where we assess it is necessary for our legitimate interests, such
            as for us to provide, operate, improve and communicate our services
            in relation to the Platform. We consider our legitimate interests to
            include research and development, understanding our audience,
            marketing and promoting the Platform, measures taken to operate the
            Platform efficiently, marketing analysis, and measures taken to
            protect our legal rights and interests.
          </p>

          <p className="text-[20px] my-10 text-gray font-bold">
            <br />
            D.&nbsp;&nbsp; &nbsp;Compliance with Law
          </p>

          <p className="text-[16px]">
            In some cases, we may have a legal obligation to use or keep your
            personal information. Such cases may include (but are not limited
            to) court orders, criminal investigations, government requests, and
            regulatory obligations. If you have any further enquiries about how
            we retain personal information in order to comply with the law,
            please feel free to enquire using the details provided in the
            Contact Us section of this privacy policy.
          </p>

          <p className="text-[32px] text-green my-10 font-bold">
            IV.&nbsp;&nbsp; &nbsp;Security of Your Personal Information
          </p>

          <p className="text-[16px]">
            When we collect and process personal information, and while we
            retain this information, we will protect it within commercially
            acceptable means to prevent loss and theft, as well as unauthorized
            access, disclosure, copying, use, or modification.
          </p>

          <p className="text-[16px]">
            Although we will do our best to protect the personal information you
            provide to us, we advise that no method of electronic transmission
            or storage is 100% secure, and no one can guarantee absolute data
            security.
          </p>

          <p className="text-[16px]">
            You are responsible for selecting any password and its overall
            security strength, ensuring the security of your own information
            within the bounds of our services. For example, ensuring any
            passwords associated with accessing your personal information and
            accounts are secure and confidential.
          </p>

          <p className="text-[32px] text-green my-10 font-bold">
            V.&nbsp;&nbsp; &nbsp;How Long We Keep Your personal information
          </p>

          <p className="text-[16px]">
            We keep your personal information only for as long as we need to.
            This time period may depend on what we are using your information
            for, in accordance with this privacy policy. For example, if you
            have provided us with personal information as part of creating an
            account with us, we may retain this information for the duration
            your account exists on our system. If your personal information is
            no longer required for this purpose, we will delete it or make it
            anonymous by removing all details that identify you.
          </p>

          <p className="text-[16px]">
            However, if necessary, we may retain your personal information for
            our compliance with a legal, accounting, or reporting obligation or
            for archiving purposes in the public interest, scientific, or
            historical research purposes or statistical purposes.
          </p>

          <p className="text-[32px] text-green my-10 font-bold">
            VI.&nbsp;&nbsp; &nbsp;Your Rights and Controlling Your personal
            information
          </p>

          <p className="text-[20px] my-10 text-gray font-bold">
            A.&nbsp;&nbsp; &nbsp;Your choice
          </p>

          <p className="text-[16px]">
            By providing personal information to us, you understand we will
            collect, hold, use, and disclose your personal information in
            accordance with this privacy policy. You do not have to provide
            personal information to us, however, if you do not, it may affect
            your use of the Platform and related services.
          </p>

          <p className="text-[20px] my-10 text-gray font-bold">
            <br />
            B.&nbsp;&nbsp; &nbsp;Information from third parties
          </p>

          <p className="text-[16px]">
            If we receive personal information about you from a third party, we
            will protect it as set out in this privacy policy. If you are a
            third party providing personal information about somebody else, you
            represent and warrant that you have such person&rsquo;s consent to
            provide the personal information to us.
          </p>

          <p className="text-[20px] my-10 text-gray font-bold">
            <br />
            C.&nbsp;&nbsp; &nbsp;Marketing permission
          </p>

          <p className="text-[16px]">
            If you have previously agreed to us using your personal information
            for direct marketing purposes, you may change your mind at any time
            by contacting us using the details below.
          </p>

          <p className="text-[20px] my-10 text-gray font-bold">
            <br />
            D.&nbsp;&nbsp; &nbsp;Access
          </p>

          <p className="text-[16px]">
            You may request details of the personal information that we hold
            about you.
          </p>

          <p className="text-[20px] my-10 text-gray font-bold">
            <br />
            E.&nbsp;&nbsp; &nbsp;Correction
          </p>

          <p className="text-[16px]">
            If you believe that any information we hold about you is inaccurate,
            out of date, incomplete, irrelevant, or misleading, please contact
            us using the details provided in this privacy policy. We will take
            reasonable steps to correct any information found to be inaccurate,
            incomplete, misleading, or out of date.
          </p>

          <p className="text-[20px] my-10 text-gray font-bold">
            <br />
            F.&nbsp;&nbsp; &nbsp;Non-discrimination
          </p>

          <p className="text-[16px]">
            We will not discriminate against you for exercising any of your
            rights over your personal information. Unless your personal
            information is required to provide you with a particular service or
            offer (for example providing user support), we will not deny you
            goods or services and/or charge you different prices or rates for
            goods or services, including through granting discounts or other
            benefits, or imposing penalties, or provide you with a different
            level or quality of goods or services.
          </p>

          <p className="text-[20px] my-10 text-gray font-bold">
            <br />
            G.&nbsp;&nbsp; &nbsp;Notification of data breaches
          </p>

          <p className="text-[16px]">
            We will comply with laws applicable to us in respect of any data
            breach.
          </p>

          <p className="text-[20px] my-10 text-gray font-bold">
            <br />
            H.&nbsp;&nbsp; &nbsp;Complaints
          </p>

          <p className="text-[16px]">
            If you believe that we have breached a relevant data protection law
            and wish to make a complaint, please contact us using the details
            below and provide us with full details of the alleged breach. We
            will promptly investigate your complaint and respond to you, in
            writing, setting out the outcome of our investigation and the steps
            we will take to deal with your complaint. You also have the right to
            contact a regulatory body or data protection authority in relation
            to your complaint.
          </p>

          <p className="text-[20px] my-10 text-gray font-bold">
            <br />
            I.&nbsp;&nbsp; &nbsp;Unsubscribe
          </p>

          <p className="text-[16px]">
            To unsubscribe from our email database or opt-out of communications
            (including marketing communications), please contact us using the
            details provided in this privacy policy, or opt-out using the
            opt-out facilities provided in the communication. We may need to
            request specific information from you to help us confirm your
            identity.
          </p>

          <p className="text-[20px] my-10 text-gray font-bold">
            <br />
            J.&nbsp;&nbsp; &nbsp;Restrict
          </p>

          <p className="text-[16px]">
            You have the right to request that we restrict the processing of
            your personal information if (i) you are concerned about the
            accuracy of your personal information; (ii) you believe your
            personal information has been unlawfully processed; (iii) you need
            us to maintain the personal information solely for the purpose of a
            legal claim; or (iv) we are in the process of considering your
            objection in relation to processing on the basis of legitimate
            interests.
          </p>

          <p className="text-[20px] my-10 text-gray font-bold">
            <br />
            K.&nbsp;&nbsp; &nbsp;Objecting to processing
          </p>

          <p className="text-[16px]">
            You have the right to object to processing of your personal
            information that is based on our legitimate interests or public
            interest. If this is done, we must provide compelling legitimate
            grounds for the processing which overrides your interests, rights,
            and freedoms, in order to proceed with the processing of your
            personal information.
          </p>

          <p className="text-[20px] my-10 text-gray font-bold">
            <br />
            L.&nbsp;&nbsp; &nbsp;Data portability
          </p>

          <p className="text-[16px]">
            You may have the right to request a copy of the personal information
            we hold about you. Where possible, we will provide this information
            in CSV format or other easily readable machine format. You may also
            have the right to request that we transfer this personal information
            to a third party.
          </p>

          <p className="text-[20px] my-10 text-gray font-bold">
            <br />
            M.&nbsp;&nbsp; &nbsp;Deletion
          </p>

          <p className="text-[16px]">
            You may have a right to request that we delete the personal
            information we hold about you at any time, and we will take
            reasonable steps to delete your personal information from our
            current records. If you ask us to delete your personal information,
            we will let you know how the deletion affects your use of the
            Platform and related services. There may be exceptions to this right
            for specific legal reasons which, if applicable, we will set out for
            you in response to your request. If you terminate or delete your
            account, we will delete your personal information within 90 days of
            the deletion of your account . Please be aware that search engines
            and similar third parties may still retain copies of your personal
            information that has been made public at least once, like certain
            profile information and public comments, even after you have deleted
            the information from our services or deactivated your account.
          </p>

          <p className="text-[32px] text-green my-10 font-bold">
            VII.&nbsp;&nbsp; &nbsp;Do Not Track
          </p>

          <p className="text-[16px]">
            Some browsers have a &ldquo;Do Not Track&rdquo; feature that lets
            you tell websites that you do not want to have your online
            activities tracked. At this time, we do not respond to browser
            &ldquo;Do Not Track&rdquo; signals.
          </p>

          <p className="text-[16px]">
            We adhere to the standards outlined in this privacy policy, ensuring
            we collect and process personal information lawfully, fairly,
            transparently, and with legitimate, legal reasons for doing so.
          </p>

          <p className="text-[32px] text-green my-10 font-bold">
            VIII.&nbsp;&nbsp; &nbsp;Use of Cookies
          </p>

          <p className="text-[16px]">
            We use &ldquo;cookies&rdquo; to collect information about you and
            your activity across our site. A cookie is a small piece of data
            that our website stores on your computer, and accesses each time you
            visit, so we can understand how you use our site. This helps us
            serve you content based on preferences you have specified.
          </p>

          <p className="text-[16px]">
            At all times, you may decline cookies from our site if your browser
            permits. Most browsers allow you to activate settings on your
            browser to refuse the setting of all or some cookies. Accordingly,
            your ability to limit cookies is based only on your browser&rsquo;s
            capabilities.&nbsp;
          </p>

          <p className="text-[16px]">
            Please refer to our Cookie Policy &nbsp;for more information.
          </p>

          <p className="text-[32px] text-green my-10 font-bold">
            IX.&nbsp;&nbsp; &nbsp;Children&rsquo;s Privacy
          </p>

          <p className="text-[16px]">
            We do not aim any of our products or services directly at children
            under the age of 13, and we do not knowingly collect personal
            information about children under 13.
          </p>

          <p className="text-[32px] text-green my-10 font-bold">
            X.&nbsp;&nbsp; &nbsp;International Transfers of personal information
          </p>

          <p className="text-[16px]">
            The personal information we collect is stored and/or processed in
            India, and United States, or where we or our partners, affiliates,
            and third-party providers maintain facilities.
          </p>

          <p className="text-[16px]">
            The countries to which we store, process, or transfer your personal
            information may not have the same data protection laws as the
            country in which you initially provided the information. If we
            transfer your personal information to third parties in other
            countries: (i) we will perform those transfers in accordance with
            the requirements of applicable law; and (ii) we will protect the
            transferred personal information in accordance with this privacy
            policy.
          </p>

          <p className="text-[32px] text-green my-10 font-bold">
            XI.&nbsp;&nbsp; &nbsp;International Transfers Outside of the
            European Economic Area (EEA)
          </p>

          <p className="text-[16px]">
            We will ensure that any transfer of personal information from
            countries in the European Economic Area (EEA) to countries outside
            the EEA will be protected by appropriate safeguards, for example by
            using standard data protection clauses approved by the European
            Commission, or the use of binding corporate rules or other legally
            accepted means.
          </p>

          <p className="text-[32px] text-green my-10 font-bold">
            XII.&nbsp;&nbsp; &nbsp;Additional Disclosures for General Data
            Protection Regulation (GDPR) Compliance (EU)
          </p>

          <p className="text-[20px] my-10 text-gray font-bold">
            Data Controller / Data Processor
          </p>

          <p className="text-[16px]">
            The GDPR distinguishes between organisations that process personal
            information for their own purposes (known as &ldquo;data
            controllers&rdquo;) and organizations that process personal
            information on behalf of other organizations (known as &ldquo;data
            processors&rdquo;). We, A.live, located at the address provided in
            our Contact Us section, are a Data Controller with respect to the
            personal information you provide to us.
          </p>

          <p className="text-[32px] text-green my-10 font-bold">
            XIII.&nbsp;&nbsp; &nbsp;Additional Disclosures for California
            Compliance (US)
          </p>

          <p className="text-[16px]">
            Under California Civil Code Section 1798.83, if you live in
            California and your business relationship with us is mainly for
            personal, family, or household purposes, you may ask us about the
            information we release to other organizations for their marketing
            purposes.
          </p>

          <p className="text-[16px]">
            To make such a request, please contact us using the details provided
            in this privacy policy with &ldquo;Request for California privacy
            information&rdquo; in the subject line. You may make this type of
            request once every calendar year. We will email you a list of
            categories of personal information we revealed to other
            organisations for their marketing purposes in the last calendar
            year, along with their names and addresses. Not all personal
            information shared in this way is covered by Section 1798.83 of the
            California Civil Code.
          </p>

          <p className="text-[20px] my-10 text-gray font-bold">
            <br />
            A.&nbsp;&nbsp; &nbsp;California Notice of Collection
          </p>

          <p className="text-[16px]">
            In the past 12 months, we have collected the following categories of
            personal information enumerated in the California Consumer Privacy
            Act (&ldquo;CCPA&rdquo;):
          </p>

          <p className="text-[16px]">
            &bull;&nbsp;&nbsp; &nbsp;Identifiers, such as name, email address,
            phone number account name, IP address, and an ID or number assigned
            to your account.
            <br />
            &bull;&nbsp;&nbsp; &nbsp;Customer records, such as billing and
            shipping address, and credit or debit card data.
            <br />
            &bull;&nbsp;&nbsp; &nbsp;Demographics, such as your age or gender.
            This category includes data that may qualify as protected
            classifications under other California or federal laws.
            <br />
            &bull;&nbsp;&nbsp; &nbsp;Commercial information, such as products
            or services history and purchases.
            <br />
            &bull;&nbsp;&nbsp; &nbsp;Internet activity, such as your
            interactions with our service.
            <br />
            &bull;&nbsp;&nbsp; &nbsp;Audio or visual data, such as photos or
            videos you share with us or post on the Platform.
            <br />
            &bull;&nbsp;&nbsp; &nbsp;Geolocation data.
            <br />
            &bull;&nbsp;&nbsp; &nbsp;Inferences, such as information about your
            interests, preferences and favourites.
          </p>

          <p className="text-[16px]">
            For more information on information we collect, including the
            sources we receive information from, review the &ldquo;Information
            We Collect&rdquo; section. We collect and use these categories of
            personal information for the business purposes described in the
            &ldquo;Collection and Use of Information&rdquo; section, including
            to provide and manage our Service.
          </p>

          <p className="text-[20px] my-10 text-gray font-bold">
            <br />
            B.&nbsp;&nbsp; &nbsp;Right to Know and Delete
          </p>

          <p className="text-[16px]">
            If you are a California resident, you have rights to delete your
            personal information we collected and know certain information about
            our data practices in the preceding 12 months. In particular, you
            have the right to request the following from us:
          </p>

          <p className="text-[16px]">
            The categories of personal information we have collected about you;
            <br />
            The categories of sources from which the personal information was
            collected;
            <br />
            The categories of personal information about you we disclosed for a
            business purpose or sold;
            <br />
            The categories of third parties to whom the personal information was
            disclosed for a business purpose or sold;
            <br />
            The business or commercial purpose for collecting or selling the
            personal information; and
            <br />
            The specific pieces of personal information we have collected about
            you.
          </p>

          <p className="text-[16px]">
            To exercise any of these rights, please contact us using the details
            provided in this privacy policy.
          </p>

          <p className="text-[20px] my-10 text-gray font-bold">
            <br />
            C.&nbsp;&nbsp; &nbsp;CCPA-permitted financial incentives
          </p>

          <p className="text-[16px]">
            In accordance with your right to non-discrimination, we may offer
            you certain financial incentives permitted by the CCPA that can
            result in different prices, rates, or quality levels for the goods
            or services we provide vis-&agrave;-vis the Platform.
          </p>

          <p className="text-[16px]">
            Any CCPA-permitted financial incentive we offer will reasonably
            relate to the value of your personal information, and we will
            provide written terms that describe clearly the nature of such an
            offer. Participation in a financial incentive program requires your
            prior opt-in consent, which you may revoke at any time.
          </p>

          <p className="text-[20px] my-10 text-gray font-bold">
            <br />
            D.&nbsp;&nbsp; &nbsp;Shine the Light
          </p>

          <p className="text-[16px]">
            If you are a California resident, in addition to the rights
            discussed above, you have the right to request information from us
            regarding the manner in which we share certain personal information
            as defined by California&rsquo;s &ldquo;Shine the Light&rdquo; with
            third parties and affiliates for their own direct marketing
            purposes.
          </p>

          <p className="text-[16px]">
            To receive this information, send us a request using the contact
            details provided in this privacy policy. Requests must include
            &ldquo;California Privacy Rights Request&rdquo; in the first line of
            the description and include your name, street address, city, state,
            and ZIP code.
          </p>

          <p className="text-[32px] text-green my-10 font-bold">
            XIV.&nbsp;&nbsp; &nbsp;Limits of Our Policy
          </p>

          <p className="text-[16px]">
            Our website may link to external sites that are not operated by us.
            Please be aware that we have no control over the content and
            policies of those sites, and cannot accept responsibility or
            liability for their respective privacy practices.
          </p>

          <p className="text-[32px] text-green my-10 font-bold">
            XV.&nbsp;&nbsp; &nbsp;Changes to This Policy
          </p>

          <p className="text-[16px]">
            At our discretion, we may change our privacy policy to reflect
            updates to our business processes, current acceptable practices, or
            legislative or regulatory changes. If we decide to change this
            privacy policy, we will post the changes here at the same link by
            which you are accessing this privacy policy.
          </p>

          <p className="text-[16px]">
            If the changes are significant, or if required by applicable law, we
            will contact you (based on your selected preferences for
            communications from us) and all our registered users with the new
            details and links to the updated or changed policy.
          </p>

          <p className="text-[16px]">
            If required by law, we will get your permission or give you the
            opportunity to opt in to or opt out of, as applicable, any new uses
            of your personal information.
          </p>

          <p className="text-[32px] text-green my-10 font-bold">
            XVI.&nbsp;&nbsp; &nbsp;Contact Us
          </p>

          <p className="text-[16px]">
            For any questions or concerns regarding your privacy, you may
            contact us using the following details:
          </p>

          <p className="text-[16px]">
            A.live Entertainment Inc., with registered address at [insert
            official Delaware address]
          </p>

          <p className="text-[16px]">
            Privacy Officer
            <br />
            privacy@alive.house&nbsp;
          </p>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
