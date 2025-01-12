 exports.otpTemplate=(otp,email)=>{
   return `<!DOCTYPE html>
    <body>
    <tr>
        <td align="center" valign="top">
            <table width="556" border="0" cellspacing="0" cellpadding="0" align="center"
                class="m_-8417353500393176574em_wrapper" style="width:556px">
                <tbody>
                    <tr>
                        <td align="center" valign="top" width="55" style="width:55px">
                            &nbsp;</td>
                        <td align="center" valign="top">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                                <tbody>
                                    <h1 style="font-family:'Graphik Web',Helvetica,Arial,sans-serif;color:#f7962c">Easy To Block</h1>
                                </tbody>
                            </table>
                        </td>
                        <td align="center" valign="top" width="55" style="width:55px">
                            &nbsp;</td>
                    </tr>
                </tbody>
            </table>
        </td>
    </tr>
    <tr>
        <td align="center" valign="top">
            <table width="556" border="0" cellspacing="0" cellpadding="0" align="center"
                class="m_-8417353500393176574em_wrapper" style="width:556px">
                <tbody>
                    <tr>
                        <td align="center" valign="top" width="55" style="width:55px">
                            &nbsp;</td>
                        <td align="center" valign="top">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                                <tbody>
                                    <tr>
                                        <td align="left" class="m_-8417353500393176574em_defaultlink" valign="top"
                                            style="font-family:'Graphik Web',Helvetica,Arial,sans-serif;font-size:16px;line-height:22px;color:#000000">
                                            <div style="width:100%; display:flex "> 
                                            <div style='marging-top:15px;'>Regestration Notification</div>   
                                            <div style='text-align:right ; margin-left:72%'>
                                            <span>&#11088;</span>
                                            </div> ✌️
                                        </div> 
                                            <hr>
                                            <span id="res" style="font-size:14px;color:#363636">
                                          Hi   ${email}    
                                            </span>
    
                                            <br><br>
                                            <span style="font-size:14px;color:#363636">
                                                This email was sent because you generated otp ${otp}</span> 
                                                <br>
                                                <br>
                                                <span style="font-size:14px;color:#363636">
                                                 otp will expires in 10 minutes
                                            
                                             </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td align="center" valign="top" width="55" style="width:55px">
                            &nbsp;</td>
                    </tr>
                </tbody>
            </table>
        </td>
    </tr>
    </body>
    </html>`
}