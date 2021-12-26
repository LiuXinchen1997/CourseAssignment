package Memento;

import java.util.LinkedList;

public class Test {
	public static void main(String[] args) {
		VersionControlSystem vcs = new VersionControlSystem();
		Document document = new Document();
		document.content = "content1";
		document.otherContent = "otherContent1";
		System.out.println(document);
		vcs.add(document.save()); // 保存备份
		
		document.content = "content2";
		document.otherContent = "otherContent2";
		System.out.println(document);
		vcs.add(document.save());
		
		document.resume(vcs.get(1));
		System.out.println(document);
		document.resume(vcs.getLastVersion());
		System.out.println(document);
	}
}

class Backup { //备忘录角色
	public String content; //备份的内容
	public int version;
	
	public Backup(String content) {
		this.content = content;
	}
}

class Document { //原发器角色
	String content; //需要备份的状态
	String otherContent; //无需备份的状态
	
	//保存为一个备份
	public Backup save() {
		System.out.println("保存备份！");
		return new Backup(content);
	}
	
	//恢复成某个状态
	public void resume(Backup backup) {
		System.out.println("恢复备份！");
		content = backup.content;
	}
	
	@Override
	public String toString() {
		return "content: " + content + ", otherContent: " + otherContent;
	}
}

class VersionControlSystem {
	LinkedList<Backup> backups = new LinkedList<>();
	int nextVersion;
	
	// 添加备份
	public void add(Backup backup) {
		backup.version = ++nextVersion;
		backups.add(backup);
	}
	
	// 取得某个版本的备份
	public Backup get(int version) {
		for (Backup backup : backups) {
			if (backup.version == version) {
				return backup;
			}
		}
		
		return null;
	}
	
	// 取得最后一个版本的备份
	public Backup getLastVersion() {
		return backups.getLast();
	}
}