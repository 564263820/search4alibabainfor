import net.htmlparser.jericho.*;
import java.util.*;
import java.io.*;
import java.net.*;

public class CompactSource {
	public static void main(String[] args) throws Exception {
		
		CompactSource.class.getClassLoader();
		//System.out.println(CompactSource.class.getClassLoader().getResource("test.html"));
		
		/*
		
		String sourceUrlString="data\test.html";
		if (args.length==0)
		  System.err.println("Using default argument of \""+sourceUrlString+'"');
		else
			sourceUrlString=args[0];
		if (sourceUrlString.indexOf(':')==-1) sourceUrlString="file:"+sourceUrlString;
		MicrosoftTagTypes.register();
		PHPTagTypes.register();
		MasonTagTypes.register();
		CompactSource.class.getClassLoader().getResource("data\test.html").getPath();
		*/
		//Source source=new Source(new URL(sourceUrlString));
		Source source=new Source(CompactSource.class.getClassLoader().getResourceAsStream("data/test.html"));
		new SourceCompactor(source).writeTo(new OutputStreamWriter(System.out));
	}
}
