package de.hydromat.zlidestats.sql;

import java.sql.*;

public class SqlManager {
	private static Connection con;

	public static void connectToDatabase(String db) {
		try {
			Class.forName("org.sqlite.JDBC");
			SqlManager.con = DriverManager.getConnection("jdbc:sqlite:" + db);
		} catch (Exception e) {
			System.err.println("Error... " + e.getClass().getName() + ": " + e.getMessage());
			System.exit(0);
		}
		System.out.println("Opened database successfully");
	}
	
	public static void InsertClan(String tag, long date, String name, int memberCount, int score, int requiredScore, int donations) {
		String sql = String.format("INSERT INTO Clan (Tag, Date, Name, MemberCount, Score, RequiredScore, Donations)"
								+ " VALUES (\"%s\", %d, \"%s\", %d, %d, %d, %d)", tag, date, name, memberCount, score, requiredScore, donations);
		executeUpdate(sql);
	}
	
	public static void InsertClanChest(String clantag, long clandate, int clanChestCrowns, int clanChestCrownsRequired) {
		String sql = String.format("INSERT INTO ClanChest (ClanTag, ClanDate, ClanChestCrowns, ClanChestCrownsRequired)"
								+ " VALUES (\"%s\", %d, %d, %d)", clantag, clandate, clanChestCrowns, clanChestCrownsRequired);
		executeUpdate(sql);
	}
	
	public static void InsertClanMember(String tag, String clantag, long clandate, String name, int level, int trophies, int score, int donation, int clanChestCrowns, String roleName) {
		String sql = String.format("INSERT INTO ClanMember (Tag, ClanTag, ClanDate, Name, Level, Trophies, Score, Donation, ClanChestCrowns, RoleName)"
								+ " VALUES (\"%s\", \"%s\", %d, \"%s\", %d, %d, %d, %d, %d, \"%s\")", tag, clantag, clandate, name, level, trophies, score, donation, clanChestCrowns, roleName);
		executeUpdate(sql);
	}

	public static void executeUpdate(String sqlStatement) {
		Statement stmt = null;

		try {
			stmt = SqlManager.con.createStatement();
			stmt.executeUpdate(sqlStatement);
			stmt.close();

//			System.out.println("Executed Update");
		} catch (SQLException e) {
			System.err.println("Error... executeUpdate: " + e.getClass().getName() + ": " + e.getMessage());
		}
	}

	public static ResultSet executeQuery(String sqlStatement) {
		Statement stmt = null;

		try {
			stmt = SqlManager.con.createStatement();
			ResultSet rs = stmt.executeQuery(sqlStatement);
			// TODO stmt.close();

//			System.out.println("Executed Query");
			return rs;
		} catch (Exception e) {
			System.err.println("Error... executeQuery: " + e.getClass().getName() + ": " + e.getMessage());
			return null;
		}
	}

	public static void disconnect() {
		try {
			SqlManager.con.close();
			System.out.println("Connection terminated");
		} catch (SQLException e) {
			System.err.println("Error... " + e.getClass().getName() + ": " + e.getMessage());
			System.exit(0);
		}
	}

	public static void setupDataBase() {
		SqlManager.executeUpdate("CREATE TABLE IF NOT EXISTS Clan "
								+ "(Tag TEXT NOT NULL, "
								+ " Date INTEGER NOT NULL, "
				
								+ " Name TEXT, "
								+ " MemberCount INTEGER, "
								+ " Score INTEGER, "
								+ " RequiredScore INTEGER, "
								+ " Donations INTEGER, "
				
								+ " PRIMARY KEY (Tag, Date))");
				
		SqlManager.executeUpdate("CREATE TABLE IF NOT EXISTS ClanChest "
								+ "(ClanTag TEXT NOT NULL, "
								+ " ClanDate INTEGER NOT NULL, "
				
								+ " ClanChestCrowns INTEGER, "
								+ " ClanChestCrownsRequired INTEGER, "
								
								+ " PRIMARY KEY (ClanTag, ClanDate), "				
								+ " FOREIGN KEY (ClanTag, ClanDate) REFERENCES Clan(Tag, Date) ON DELETE CASCADE)");
				
		SqlManager.executeUpdate("CREATE TABLE IF NOT EXISTS ClanMember "
								+ "(Tag TEXT,"
								+ " ClanTag TEXT NOT NULL, "
								+ " ClanDate INTEGER NOT NULL, "
				
								+ " Name TEXT, "
								+ " Level INTEGER, "
								+ " Trophies INTEGER, "
								+ " Score INTEGER, "
								+ " Donation INTEGER, "
								+ " ClanChestCrowns INTEGER, "
								+ " RoleName TEXT, "
								
								+ " PRIMARY KEY (Tag, ClanDate), "				
								+ " FOREIGN KEY (ClanTag, ClanDate) REFERENCES Clan(Tag, Date) ON DELETE CASCADE)");
	}
}
