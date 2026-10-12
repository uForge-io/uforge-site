---
icon: lucide/braces
description: "MicroPython向けのSF32入門手順はまだ検証されていません。再現可能な初回起動にはSiFli-SDKを使用し、対応状況はMicroPythonステータスページで確認してください。"
tags:
    - はじめに
    - MicroPython
---

# MicroPython { #micropython }

SF32向けのMicroPython入門手順は、まだ検証されていません。確認したSiFliおよびOpenSiFliの資料には、公式のボード別ファームウェアイメージ、書き込み手順、REPL設定が現時点で記載されていません。

[SiFli-SDK](../sifli/getting-started-sifli-sdk.md)の手順に沿って、ボードとケーブルの状態を確認し、シリアルポートを特定してファームウェアを書き込み、再現可能な基準環境を整えてください。一般的なMicroPythonのインストール手順や、別のMCUまたはボード向けのイメージは使用しないでください。

[MicroPythonの状況](../../develop/platforms/micropython/status.md)ページでは、このページをチュートリアルにするために必要な公開成果物と受け入れ基準を具体的に管理しています。

!!! warning "検証済みのMicroPythonチュートリアルはまだありません"
    SF32向けの実用的なMicroPythonガイドには、ボードとメモリー構成に合ったファームウェアイメージ、書き込みと復旧のコマンド、REPLのポートとボーレート、ファイルシステムの動作、実際の対応範囲を正確に示す周辺機器対応表が必要です。これらの情報が公開されるまでは、このページには意図的にインストール手順を掲載していません。

## 検証済みチュートリアルに必要な情報 { #what-sifli-should-publish }

今後SF32向けMicroPythonチュートリアルを利用する前に、対応するボード専用イメージ、検証済みの書き込み・復旧コマンド、REPLのポートとボーレート、ファイルシステムの動作、継続的に更新されているペリフェラル対応表が記載されていることを確認してください。[ステータスページ](../../develop/platforms/micropython/status.md)にこれらの情報がそろうまでは、初回の立ち上げに上記のSiFli-SDKの手順を使ってください。
