#!/usr/bin/env ruby
# test for pipeline.rb

require "test/unit"
require_relative "pipeline"

class PipelineTest < Test::Unit::TestCase
  def test_seed_is_7331
    assert_equal 7331, SEED
  end

  def test_stats_have_seed
    stats = generate_readme_stats
    assert_equal 7331, stats[:seed]
  end
end
