<%@ page pageEncoding="UTF-8"%>
<div class="foot" id="ossFoot">
	<table width="100%" border="0" class="foot_table">
		<tbody>
			<tr>
				<td width="40%" valign="middle" align="center">
					<table cellspacing="0" cellpadding="0" border="0">
						<tbody>
							<tr>
								<td>
								</td>
								<td>
										<input type="text"   id="MSG_T_Msg" />
										<select id="MSG_T_USER">
											<option value="1">admin</option>
											<option value="2">t1</option>
											<option value="3">t2</option>
										</select>
										<input value="发送" type="button" onclick="propmtMsgContext.SendMsg($('#MSG_T_Msg').val(),$('#MSG_T_USER').val())"/>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table>
</div>

<script type="text/javascript" src="<%=request.getContextPath()%>/script/artDialog/artDialog.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/script/artDialog/skin.js"></script>
<script src="<%=request.getContextPath()%>/script/SysMSGUtil.js" type="text/javascript" charset="UTF-8"></script>

