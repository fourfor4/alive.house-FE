import React, { useEffect } from "react";
import TriBorder from "../../../assets/comps/TriBorder/TriBorder";
import Nav from "../HomeScreenPage/components/Nav";
import useRouter from '../../../hooks/useRouter';

const LegalPolicy = () => {
  const router = useRouter()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Nav />
      <div className="w-screen h-fit min-h-screen flex flex-col justify-start items-center">
        <div className="w-full alivebottomborder h-[250px] bg-gray flex flex-col justify-center items-center">
          <h1 className="text-[80px] text-green ">terms of service</h1>
          <p className="text-[16px] text-white">
          these terms of service were last updated on 9 august 2022.
          </p>
          {/* <p className="text-[16px] text-white">
            Last updated on 2 August 2022.
          </p> */}
        </div>
        {/* <TriBorder height="54px" /> */}
        <div className="w-[80%] h-fit min-h-screen mt-[12rem] pl-2 mb-10">
          <p className="text-[16px]">
            These Terms of Service (“Terms”) govern your use of and any activity on the Platform located at https://alive.house and any related services provided by A.live. These Terms govern your access to, use of, and interaction with the Platform, including any content, functionality, and services offered on or through the Platform and your creation of any Assets (defined below) (collectively, the “Services”).
          </p>
          <br/><br/>
          <p className="text-[16px]">
            By accessing https://alive.house, you agree to abide by these Terms, including our <span onClick={() => router.push("/privacypolicy")} className="text-green">Privacy Policy</span> and <span className="text-green">Acceptable Use Policy</span>  and to comply with all applicable laws and regulations. If you do not agree with these Terms, you are prohibited from using or accessing the Platform or using any Services.
          </p>
          <br/><br/>
          <p className="text-[16px]">
            We, A.live, reserve the right to review and amend any of these Terms at our sole discretion. Upon doing so, we will update this page. Any changes to these Terms will take effect immediately from the date of publication.
          </p>
          <br/><br/>
          <p className="text-[16px]">        
            By utilizing our Services, you affirm that you are aware and acknowledge that A.live is a service provider that has developed and distributed the Platform where the Services occur without any involvement or actions taken by A.live or any third-party.
          </p>

          <p className="text-[32px] text-green mt-[10rem] mb-10 font-bold">
            I.&nbsp;&nbsp; &nbsp;Limitations of Use
          </p>

          <p className="text-[16px]">
          By using the Platform and the Services, you warrant on behalf of yourself, your users, and other parties you represent that:
          </p>
          <ul className="text-[16px] mt-[3rem]">
            <li>&nbsp;&nbsp;&bull;&nbsp;You are 18 years of age or older</li>
            <li>&nbsp;&nbsp;&bull;&nbsp;You are of legal age to form a binding contract</li>
            <li>&nbsp;&nbsp;&bull;&nbsp;You will not modify, copy, prepare derivative works of, decompile, or reverse engineer any materials and software contained on the Platform</li>
            <li>&nbsp;&nbsp;&bull;&nbsp;You will not remove any copyright or other proprietary notations from any materials and software on the Platform</li>
            <li>&nbsp;&nbsp;&bull;&nbsp;You will not transfer the materials to another person or “mirror” the materials on any other server</li>
            <li>&nbsp;&nbsp;&bull;&nbsp;You will not knowingly or negligently use the Platform or any of the Services in a way that abuses or disrupts our networks or any other service A.live provides</li>
            <li>&nbsp;&nbsp;&bull;&nbsp;You will not use this website or its associated services to transmit or publish any harassing, indecent, obscene, fraudulent, or unlawful material</li>
            <li>&nbsp;&nbsp;&bull;&nbsp;You will not use the Platform or the Services in violation of any applicable laws or regulations</li>
            <li>&nbsp;&nbsp;&bull;&nbsp;You will not use the Platform in conjunction with sending unauthorized advertising or spam</li>
            <li>&nbsp;&nbsp;&bull;&nbsp;You will not harvest, collect, or gather user data without the user’s consent</li>
            <li>&nbsp;&nbsp;&bull;&nbsp;You will not use the Platform or the Services in such a way that may infringe the privacy, intellectual property rights, or other rights of third parties.</li>
          </ul>

          <p className="text-[32px] text-green mt-[10rem] mb-10 font-bold">
            II.&nbsp;&nbsp;Assets
          </p>

          <p className="text-[16px]">          
            The Platform enables users such as you to create, buy, transfer, and trade unique digital assets in music (each, an “Asset” and together, the “Assets”), which can then be used on the Platform for various purposes. These Terms and the Acceptable Use Policy apply to all Assets created in the use of this Platform and Services.
          </p>

          <p className="text-[20px] my-10 text-gray font-bold">
            <br />
            A.&nbsp;&nbsp;Sale & Purchase of Assets 
          </p>

          <p className="text-[16px]">
          You may make your Assets available for purchase on the Platform. Each Asset is a non-fungible token (a “NFT”) on the blockchain. When you upload an Asset and make it available for sale on the Platform, you retain ownership of all intellectual property rights associated with such Asset but you agree to make a certain number of the Assets available for sale as NFTs. End users who purchase the Asset own that underlying, purchased NFT completely and have the right to sell, trade, donate, give away, transfer, or otherwise dispose of the NFT as they see fit; provided, however, that each Asset will be tokenized so that it will have provable scarcity and proof of ownership.&nbsp;
          </p>
          <br/><br/>
          <p className="text-[16px]">
          If you make your Assets available to other users hereunder, you acknowledge and accept that such Assets (i) may be made available for purchase on the Platform and (ii) that the purchase of such Assets is governed by these Terms and the Digital Collectibles Terms and Conditions.
          </p>
          <br/><br/>
          <p className="text-[16px]">
          If you purchase an Asset on the Platform, please be aware that the creator of the Asset retains copyright to the Asset, which means you cannot use the Asset for commercial purposes of any kind; provided, however, that you do acquire the right to display and resell the Asset.
          </p>
          
         

          <p className="text-[20px] my-10 text-gray font-bold">
            <br />
            B.&nbsp;&nbsp;Payment & Taxes
          </p>

          <p className="text-[16px]">
          i.	Meta Mask Login<br/>
            If you have signed up to the Platform via the Meta Mask wallet, and you elect to purchase and/or sell Assets on the Platform, any financial transactions that you engage in will be conducted solely through the Polygon network via Meta Mask. A.live has no insight into or control over these payments or transactions, nor do we have the ability to reverse any transactions. 
          </p>
          <br/><br/>
          <p className="text-[16px]">
          ii.	Email Login <br/>
            If you have signed up to the Platform via email, you may purchase and/ or sell Assets on the Platform using a third-party fiat currency payment gateway, namely Fortmatic. You will be subject to the terms and conditions  of Fortmatic’s payment gateway for any transactions with fiat currency. 
          </p>
          <br/><br/>
          <p className="text-[16px]">
          iii.	Liability, Fees & Taxes <br/>
A.live will have no liability to you or to any third party for any claims or damages that may arise as a result of any transactions that you engage in on the Platform or vis-à-vis the Services.
          </p>
          <br/><br/>
          <p className="text-[16px]">
          Each sales transaction that occurs on the Platform will be subject to a fee payable by the purchaser to A.live. Such fee will be automatically applied as part of the sales transaction.
          </p>
          <br/><br/>
          <p className="text-[16px]">
            As between you and A.live, you will be solely responsible to pay any and all sales, use, value-added and other taxes, duties, and assessments (except taxes on A.live’s net income) now or hereafter claimed or imposed by any governmental authority (collectively, “Taxes”) associated with your use of the Platform and the Services (including, without limitation, any Taxes that may become payable as a result of your ownership, transfer, or creation of any Assets).
          </p>



          <p className="text-[20px] my-10 text-gray font-bold">
            <br />
            C.&nbsp;&nbsp; &nbsp;Third Party Rights & Licenses in Assets
          </p>

          <p className="text-[16px]">
          You are solely responsible for ensuring that any Assets created, distributed or traded by you on the Platform comply with any applicable laws and third party rights, including but not limited to any intellectual property rights, privacy rights and publicity rights. You agree that any information included in your Assets may be used in accordance with our Privacy Policy. A.live reserves the right, without any obligation, to accept or reject any Assets. You agree that the Assets and your use of this Platform and Services
          </p>
          <br/><br/>

          <p className="text-[16px]">
          By using the Platform and the Services, you grant A.live a worldwide, non-exclusive, royalty-free, perpetual, irrevocable, sub-licensable, transferable right and license to use, reproduce, publicly display, distribute and adapt the publicly shared Assets for the purposes of developing, distributing, providing, improving, and promoting the Platform, the Services, our activities, and your publicly shared Assets. You further grant A.live the right to use your name, likeness and trademarks, if any, in connection with our use of your publicly shared Assets.
          </p>
   

          

          <p className="text-[32px] text-green mt-[8rem] mb-10 font-bold">
            III.&nbsp;&nbsp; &nbsp;Intellectual Property
          </p>

          <p className="text-[16px]">
          Except for the Assets, all intellectual property in the Platform are owned by or licensed to A.live and are protected by applicable copyright and trademark law. We grant our users permission to access the Platform and the Services for personal, non-commercial transitory use.
          </p>
          <br/><br/>

          <p className="text-[16px]">
          This constitutes the grant of a license, not a transfer of title. This license shall automatically terminate if you violate any of these restrictions or the Terms, and may be terminated by A.live at any time.
          </p>

          <p className="text-[20px] my-10 text-gray font-bold">
            <br />
             User-Generated Content
          </p>

          <p className="text-[16px]">
          For any non-Asset related content submitted by you to the Platform, you retain your intellectual property ownership rights over the same. A.live does not claim ownership of such content, but we do require a license from you in order to use it.
          </p>
          <br/><br/>
          <p className="text-[16px]">
          When you use the Platform or the Services to post, upload, share, or otherwise transmit content covered by intellectual property rights, you grant to us a non-exclusive, royalty-free, transferable, sub-licensable, worldwide license to use, distribute, modify, run, copy, publicly display, translate, or otherwise create derivative works of such content in a manner that is consistent with your privacy preferences and our Privacy Policy.
          </p>
          <br/><br/>
          <p className="text-[16px]">
          The license you grant us can be terminated at any time by deleting your content or account. However, to the extent that we (or our partners) have used such content in connection with commercial or sponsored content, the license will continue until the relevant commercial or post has been discontinued by us.
          </p>
          <br/><br/>
          <p className="text-[16px]">
          You give us permission to use your username and other identifying information associated with your account in a manner that is consistent with your privacy preferences, and our Privacy Policy.
          </p>


          

          <p className="text-[32px] text-green mt-[8rem] mb-10 font-bold">
            IV.&nbsp;&nbsp; &nbsp;Liability
          </p>

          <p className="text-[16px]">
          The Platform, the Services and the website are provided on an ‘as is’ basis. To the extent permitted by law, A.live makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property, or other violation of rights.
          </p>
          <br/><br/>

          <p className="text-[16px]">
          In no event shall A.live or its partners be liable for any consequential loss suffered or incurred by you or any third party arising from the use or inability to the Platform or the Services, even if A.live or an authorized representative has been notified, orally or in writing, of the possibility of such damage.
          </p>
          <br/><br/>

          <p className="text-[16px]">
          In the context of this agreement, “consequential loss” includes any consequential loss, indirect loss, real or anticipated loss of profit, loss of benefit, loss of revenue, loss of business, loss of goodwill, loss of opportunity, loss of savings, loss of reputation, loss of use and/or loss or corruption of data, whether under statute, contract, equity, tort (including negligence), indemnity, or otherwise.
          </p>
          <br/><br/>
          <p className="text-[16px]">
          Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
          </p>
         

          <p className="text-[32px] text-green mt-[8rem] mb-10 font-bold">
            V.&nbsp;&nbsp; &nbsp;Accuracy of Materials
          </p>

          <p className="text-[16px]">
          The materials appearing on the Platform or in relation to the Services are not comprehensive and are for general information purposes only. A.live does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on the Platform, or otherwise relating to such materials or on any resources linked to the Platform or the Services.
          </p>


          <p className="text-[32px] text-green mt-[8rem] mb-10 font-bold">
            VI.&nbsp;&nbsp; &nbsp;Links
          </p>

          <p className="text-[16px] text-gray ">
          A.live has not reviewed all of the sites linked to the Platform and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement, approval, or control by A.live of the site. Use of any such linked site is at your own risk and we strongly advise you make your own investigations with respect to the suitability of those sites.
          </p>


          <p className="text-[32px] text-green mt-[8rem] mb-10 font-bold">
            VII.&nbsp;&nbsp; &nbsp;Right to Terminate
          </p>

          <p className="text-[16px]">
          We may suspend or terminate your right to use the Platform and/ or the Services and terminate these Terms immediately upon written notice to you for any breach of these Terms.

          </p>



          <p className="text-[32px] text-green mt-[8rem] mb-10 font-bold">
            VIII.&nbsp;&nbsp; &nbsp;Severance
          </p>

          <p className="text-[16px]">
          Any clause or condition of these Terms which is wholly or partially void or unenforceable is severed to the extent that it is void or unenforceable. The validity of the remainder of these Terms shall not be affected.
          </p>

         

          <p className="text-[32px] text-green mt-[8rem] mb-10 font-bold">
            IX.&nbsp;&nbsp; &nbsp;Governing Law 
          </p>

          <p className="text-[16px]">
          These Terms are governed by and construed in accordance with the laws of Delaware. You irrevocably submit to the exclusive jurisdiction of the courts in the State of Delaware.
          </p>

          <div className="h-[10rem]"/>

         
        </div>
      </div>
    </>
  );
};

export default LegalPolicy;
