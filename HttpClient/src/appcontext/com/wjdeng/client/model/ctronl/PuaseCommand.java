/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Aug 30, 2010
 * File Name       : PuaseCommand.java
 *
 ********************************************************************************/
package com.wjdeng.client.model.ctronl;

/**
 * 
 * 暂停 命令
 * 
 * @author Administrator
 * @version 1.0
 */
public class PuaseCommand implements Command {

	@Override
	public void executCommand(ModeParament par) {
		par.setEndTask(true);
	}

}
