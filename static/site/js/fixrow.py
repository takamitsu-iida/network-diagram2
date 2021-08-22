#!/usr/bin/python3
# -*- coding: utf-8 -*-
"""fix row
"""

__author__ = 'Takamitsu IIDA'
__version__ = '0.0'
__date__ = '2021/08/22'

#
# 標準ライブラリのインポート
#
import re
import os
import sys
from typing import Text
import typing
from pathlib import Path
import argparse

def here(path=''):
    return os.path.abspath(os.path.join(os.path.dirname(__file__), path))

app_dir = here(".")

if __name__ == "__main__":

    def get_lines(path: str) -> list:
        """ファイルを読んで行配列を返却する"""
        lines = []
        with open(path, 'r') as f:
            for line in f:
                lines.append(line.rstrip())
        return lines


    def parse_lines(lines: list, regexp):
        """行の配列を走査して正規表現に一致したlineとmatchをyieldする"""
        for line in lines:
            match = re.search(regexp, line)
            if match:
                yield line, match


    def main() -> int:
        """メイン関数

        Returns:
          int -- 正常終了は0、異常時はそれ以外を返却
        """
        parser = argparse.ArgumentParser(description='parse show ip route output.')
        parser.add_argument('-f', '--filename', dest='filename', default='', help='target filename')
        parser.add_argument('--debug', action='store_true', default=False, help='Debug to develop script')
        args = parser.parse_args()

        if args.filename:
            # カレントディレクトリからのパス
            input_path = os.path.join(app_dir, args.filename)

            # read file and get lines
            lines = get_lines(input_path);

            # compile regexp
            re_row = re.compile(r'(^\s+row\s+=\s+)(?P<row>\d{1,2})(.*)')

            new_lines = []
            for line in get_lines(input_path):
                match = re.search(re_row, line)
                if match:
                    row = match.group('row')
                    row_num = int(row)
                    if row_num >= 6:
                        row_num = row_num + 2
                        line = re.sub(re_row, r'\g<1>' +  str(row_num) + r'\g<3>', line)
                        new_lines.append(line)
                    else:
                        new_lines.append(line)
                else:
                    new_lines.append(line)

            for line in new_lines:
                print(line)

        return 0

    sys.exit(main())
