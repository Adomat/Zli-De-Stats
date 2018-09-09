package de.hydromat.zlidestats;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;

public class DataBaseManager {
	private Connection conn;

	public DataBaseManager() {
		String url = "jdbc:sqlite:stats.db";
		try {
			conn = DriverManager.getConnection(url);
			
			executeUpdate("CREATE TABLE IF NOT EXISTS clan ("
						+ "	timestamp integer PRIMARY KEY,"
						+ "	trophies integer"
						+ ");");
			
			executeUpdate("CREATE TABLE IF NOT EXISTS members ("
						+ "	timestamp integer,"
						+ "	name text,"
						+ "	trophies integer,"
						+ "	donationsDone integer,"
						+ "	donationsReceived integer,"
						+ " PRIMARY KEY(timestamp,name)"
						+ ");");
			
		} catch (SQLException e) {
			Console.logError("Fehler beim Verbinden oder Einrichten der Datenbank", e.getMessage());
		}
	}
	
	private void executeUpdate(String sql) throws SQLException {
		Statement stmt = conn.createStatement();
		stmt.executeUpdate(sql);
	}

	public void addNewClanEntry(int trophies) {
		try {
			String sql = "INSERT INTO clan(timestamp, trophies) VALUES(?,?)";
			PreparedStatement pstmt = conn.prepareStatement(sql);
			
			pstmt.setLong(1, MainThread.threadTimeStamp);
			pstmt.setInt(2, trophies);

			pstmt.executeUpdate();
		} catch (SQLException e) {
			Console.logError("Fehler beim Einfügen eines Clan Entries", e.getMessage());
		}
	}

	public void addNewMemberEntry(String name, int trophies, int donationsDone, int donationsReceived) {
		try {
			String sql = "INSERT INTO members(timestamp, name, trophies, donationsDone, donationsReceived) VALUES(?,?,?,?,?)";
			PreparedStatement pstmt = conn.prepareStatement(sql);
	
			pstmt.setLong(1, MainThread.threadTimeStamp);
			pstmt.setString(2, name);
			pstmt.setInt(3, trophies);
			pstmt.setInt(4, donationsDone);
			pstmt.setInt(5, donationsReceived);
	
			pstmt.executeUpdate();
		} catch (SQLException e) {
			Console.logError("Fehler beim Einfügen eines Member Entries", e.getMessage());
		}
	}

}
