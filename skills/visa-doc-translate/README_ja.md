# Visa Document Translator

ビザ申請の書類（画像）をプロフェッショナルな英語のPDFに自動翻訳する。

## 機能 (Features)

- **自動OCR**: 複数のOCRメソッドを試行（macOS Vision、EasyOCR、Tesseract）
- **バイリンガルPDF**: 元の画像 + プロフェッショナルな英語翻訳
- **多言語対応**: 中国語およびその他の言語をサポート
- **プロフェッショナルなフォーマット**: 公式なビザ申請に最適
- **完全自動化**: 手動による介入は不要

## サポートされる書類 (Supported Documents)

- 銀行残高証明書 (Bank deposit certificates)
- 在職証明書 (Employment certificates)
- 退職証明書 (Retirement certificates)
- 収入証明書 (Income certificates)
- 房产証明書 (Property certificates)
- 営業許可証 (Business licenses)
- 身分証明書とパスポート (ID cards and passports)

## 使用方法 (Usage)

```bash
/visa-doc-translate <image-file>
```

### 例 (Examples)

```bash
/visa-doc-translate RetirementCertificate.PNG
/visa-doc-translate BankStatement.HEIC
/visa-doc-translate EmploymentLetter.jpg
```

## 出力 (Output)

以下の内容を含む `<filename>_Translated.pdf` が作成される。
- **ページ 1**: 元の書類の画像（中央配置、A4サイズ）
- **ページ 2**: プロフェッショナルな英語翻訳

## 要件 (Requirements)

### Python ライブラリ
```bash
pip install pillow reportlab
```

### OCR (以下のいずれか)

**macOS (推奨)**:
```bash
pip install pyobjc-framework-Vision pyobjc-framework-Quartz
```

**クロスプラットフォーム**:
```bash
pip install easyocr
```

**Tesseract**:
```bash
brew install tesseract tesseract-lang
pip install pytesseract
```

## 仕組み (How It Works)

1. 必要に応じてHEICをPNGに変換する
2. EXIFの回転情報を確認して適用する
3. 利用可能なOCRメソッドを使用してテキストを抽出する
4. プロフェッショナルな英語に翻訳する
5. バイリンガルのPDFを生成する

## 最適な用途 (Perfect For)

- オーストラリアのビザ申請
- アメリカのビザ申請
- カナダのビザ申請
- イギリスのビザ申請
- EUのビザ申請

## ライセンス (License)

MIT
