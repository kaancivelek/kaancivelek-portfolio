# Star Navigation Component


## Dosya Yapısı

```
star-navigation/
├── StarNavigation.tsx      # Ana bileşen
├── StarShape.tsx           # Yıldız şekli bileşeni
├── TipLine.tsx            # Uç çizgileri bileşeni
├── NavigationButton.tsx   # Navigasyon butonları
├── constants.ts           # Sabitler
├── types.ts              # TypeScript tipleri
└── utils.ts              # Yardımcı fonksiyonlar
```

## Kullanım

```tsx
import StarNavigation from "@/components/star-navigation/StarNavigation";

export default function Page() {
  return <StarNavigation />;
}
```

## Özellikler

-  Minimal ve şık tasarım 
-  Temiz kod prensipleri
-  Modüler yapı
-  Framer Motion ile yumuşak animasyonlar
-  Erişilebilir ve responsive
