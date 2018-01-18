package com.oracle.ebp.domain;

public class TicketDetail {
	private int tdid;
	private int tId;
	private String descs = "";
	private String images = "";
	private String sequence = "";
	
	private int iCount = 0;// 记录当前已保存了多少张图片
	private int dCount = 0;// 记录当前已保存了多少段描述
	public int getTdid() {
		return tdid;
	}
	public void setTdid(int tdid) {
		this.tdid = tdid;
	}
	public int gettId() {
		return tId;
	}
	public void settId(int tId) {
		this.tId = tId;
	}
	public String getDescs() {
		return descs;
	}
	public void setDescs(String descs) {
		this.descs = descs;
	}
	public String getImages() {
		return images;
	}
	public void setImages(String images) {
		this.images = images;
	}
	public String getSequence() {
		return sequence;
	}
	public void setSequence(String sequence) {
		this.sequence = sequence;
	}
	public int getiCount() {
		return iCount;
	}
	public void setiCount(int iCount) {
		this.iCount = iCount;
	}
	public int getdCount() {
		return dCount;
	}
	public void setdCount(int dCount) {
		this.dCount = dCount;
	}
	public TicketDetail(int tdid, int tId, String descs, String images, String sequence, int iCount, int dCount) {
		super();
		this.tdid = tdid;
		this.tId = tId;
		this.descs = descs;
		this.images = images;
		this.sequence = sequence;
		this.iCount = iCount;
		this.dCount = dCount;
	}
	public TicketDetail() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "TicketDetail [tdid=" + tdid + ", tId=" + tId + ", descs=" + descs + ", images=" + images + ", sequence="
				+ sequence + ", iCount=" + iCount + ", dCount=" + dCount + "]";
	}
}
