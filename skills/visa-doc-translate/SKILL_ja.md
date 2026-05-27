---
name: visa-doc-translate
description: Translate visa application documents (images) to English and create a bilingual PDF with original and translation
---

あなたは、ビザ申請のための書類の翻訳を支援している。

## 指示 (Instructions)

ユーザーが画像ファイルのパスを提供した場合、確認を求めることなく、自動的に以下の手順を実行すること。

1. **画像変換 (Image Conversion)**: ファイルがHEIC形式の場合は、`sips -s format png <input> --out <output>` を使用してPNGに変換する。

2. **画像の回転 (Image Rotation)**:
   - EXIFの回転方向(orientation)データを確認する。
   - EXIFデータに基づいて、自動的に画像を回転させる。
   - EXIFのorientationが6の場合、反時計回りに90度回転させる。
   - ドキュメントが逆さまに見える場合は、追加の回転を適用する（180度テスト）。

3. **OCRテキスト抽出 (OCR Text Extraction)**:
   - 複数のOCRメソッドを自動的に試行する:
     - macOS Visionフレームワーク (macOSで推奨)
     - EasyOCR (クロスプラットフォーム、tesseract不要)
     - Tesseract OCR (利用可能な場合)
   - ドキュメントからすべてのテキスト情報を抽出する。
   - 書類の種類を特定する（残高証明書、在職証明書、退職証明書など）。

4. **翻訳 (Translation)**:
   - すべてのテキストコンテンツをプロフェッショナルな英語に翻訳する。
   - 元の文書の構造とフォーマットを維持する。
   - ビザ申請に適した専門用語を使用する。
   - 固有名詞は元の言語のままにし、括弧内に英語を記載する。
   - 中国語の名前については、ピンイン形式を使用する（例: WU Zhengye）。
   - すべての数字、日付、および金額を正確に保持する。

5. **PDF生成 (PDF Generation)**:
   - PILおよびreportlabライブラリを使用してPythonスクリプトを作成する。
   - ページ 1: 回転した元の画像を表示し、中央に配置してA4ページに収まるようにスケーリングする。
   - ページ 2: 適切なフォーマットで英語の翻訳を表示する:
     - タイトルは中央揃えで太字にする。
     - コンテンツは適切な間隔で左揃えにする。
     - 公式文書に適したプロフェッショナルなレイアウトにする。
   - 下部に「This is a certified English translation of the original document」という注記を追加する。
   - スクリプトを実行してPDFを生成する。

6. **出力 (Output)**: 同じディレクトリに `<original_filename>_Translated.pdf` という名前のPDFファイルを作成する。

## サポートされる書類 (Supported Documents)

- 銀行残高証明書 (存款证明)
- 収入証明書 (收入证明)
- 在職証明書 (在职证明)
- 退職証明書 (退休证明)
- 房产証明書 (房产证明)
- 営業許可証 (营业执照)
- 身分証明書とパスポート
- その他の公式文書

## 技術的な実装 (Technical Implementation)

### OCRメソッド (試行順序)

1. **macOS Vision Framework** (macOSのみ):
   ```python
   import Vision
   from Foundation import NSURL
   ```

2. **EasyOCR** (クロスプラットフォーム):
   ```bash
   pip install easyocr
   ```

3. **Tesseract OCR** (利用可能な場合):
   ```bash
   brew install tesseract tesseract-lang
   pip install pytesseract
   ```

### 必要なPythonライブラリ

```bash
pip install pillow reportlab
```

macOS Visionフレームワークの場合:
```bash
pip install pyobjc-framework-Vision pyobjc-framework-Quartz
```

## 重要なガイドライン (Important Guidelines)

- 各ステップでユーザーに確認を求めてはならない。
- 最適な回転角度を自動的に決定する。
- 1つのOCRメソッドが失敗した場合は、別のOCRメソッドを試行する。
- すべての数字、日付、および金額が正確に翻訳されていることを確認する。
- クリーンでプロフェッショナルなフォーマットを使用する。
- プロセス全体を完了し、最終的なPDFの場所を報告する。

## 使用例 (Example Usage)

```bash
/visa-doc-translate RetirementCertificate.PNG
/visa-doc-translate BankStatement.HEIC
/visa-doc-translate EmploymentLetter.jpg
```

## 出力例 (Output Example)

このスキルは以下を実行する:
1. 利用可能なOCRメソッドを使用してテキストを抽出する。
2. プロフェッショナルな英語に翻訳する。
3. 以下の内容を含む `<filename>_Translated.pdf` を生成する:
   - ページ 1: 元の書類の画像
   - ページ 2: プロフェッショナルな英語翻訳

オーストラリア、アメリカ、カナダ、イギリスなど、翻訳された書類を必要とする国へのビザ申請に最適である。
