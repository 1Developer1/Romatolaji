export interface Announcement {
    id: string; // Veritabanında otomatik oluşturulacak veya manuel girilecek bir ID
    title: string; // Duyurunun başlığı
    content: string; // Duyurunun içeriği
    createdAt: Date; // Duyurunun oluşturulma tarihi
  }
  