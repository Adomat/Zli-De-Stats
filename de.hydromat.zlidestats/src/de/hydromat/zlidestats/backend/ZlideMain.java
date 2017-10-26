package de.hydromat.zlidestats.backend;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import de.hydromat.zlidestats.sql.SqlManager;

public class ZlideMain {

	public static void main(String[] args) throws SQLException {
		SqlManager.connectToDatabase();
		SqlManager.setupDataBase();
		
		List<ZlideMiner> minerList = new LinkedList<ZlideMiner>();
		minerList.add(new ZlideMiner("8LVVU0U")); // Zli de Royale #1
		minerList.add(new ZlideMiner("2GPRJJG")); // Zli de Royale #2
		minerList.add(new ZlideMiner("2R92CURQ")); // Zli de Royale #3
		
		ZlideCrawler crawler = new ZlideCrawler(minerList, 8*60*60*1000); // every 8 hours in milisecs
		crawler.run();
		
//		ResultSet rs = SqlManager.executeQuery("SELECT * FROM ClanMember");
//		while (rs.next())
//		{
//			System.out.println("ClanMember: " + rs.getString("Name") + " (" + rs.getString("RoleName") + ") - trophies: " + rs.getInt("Trophies") +
//					" - donations: " + rs.getInt("Donation") + " - ClanChestCrowns: "  + rs.getInt("ClanChestCrowns"));
//		}
		
		SqlManager.disconnect();
	}

}
